import React, {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import api, {updateApiToken} from '@/lib/api.ts';
import {useNavigate} from 'react-router-dom';
import {z} from 'zod';
import {loginSchema, registerSchema} from '@/schema/authSchemas.ts';
import {isAxiosError} from 'axios';
import {Avatar} from '@/page/Chat.tsx';
import {toast} from '@/hooks/use-toast.ts';

export type User = {
  nickname: string,
  handle: string,
  avatar: Avatar
  roles: {
    id: number,
    name: 'USER' | 'ADMIN'
  }[]
}

const AuthContext = createContext({} as {
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  signIn: (credentials: z.infer<typeof loginSchema>) => Promise<void>,
  register: (credentials: z.infer<typeof registerSchema>) => Promise<void>,
  logOut: () => void
  fetchUser: () => Promise<void>
});

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setAuthentication] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      void fetchUser();
    }, []);

    const fetchUser = async () => {
      const token = Cookies.get('yabbl.token');

      if (token) {
        try {
          const {data} = await api.get('/api/user/me');

          setUser(data.result);
          setAuthentication(true);
          setLoading(false);
        } catch (e) {
          if (isAxiosError(e)) {
            if (e.response?.status === 401) {
              updateApiToken();
            }
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
      }
    };

    const doLoginRequest = async (credentials: z.infer<typeof loginSchema>, isSecondTry?: boolean) => {
      try {
        return await api.post('/auth/login', credentials);
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 401 && !isSecondTry) {
          updateApiToken();
          return await doLoginRequest(credentials, true);
        }
        throw e;
      }
    };

    const signIn = async (credentials: z.infer<typeof loginSchema>, redirect?: string) => {
      setLoading(true);

      try {
        const {data} = await doLoginRequest(credentials);

        updateApiToken(data.result.token, data.result.durationInSeconds);

        setUser(data.result.user);
        setAuthentication(true);
        navigate(redirect || '/');
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 401) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response.data.result.error,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    const register = async (credentials: z.infer<typeof registerSchema>) => {
      setLoading(true);
      try {
        await api.post('api/user', credentials);

        void signIn(credentials, '/customize');
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 409) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response.data.result.error,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    const logOut = () => {
      setUser(null);
      updateApiToken();
      navigate('/login');
      setAuthentication(false);
    };

    return (
      <AuthContext.Provider value={{user, isAuthenticated, isLoading, signIn, register, logOut, fetchUser}}>
        {children}
      </AuthContext.Provider>
    );
  }
;

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
