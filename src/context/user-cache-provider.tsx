import {User} from '@/context/auth-provider.tsx';
import React, {createContext, useCallback, useState} from 'react';
import api from '@/lib/api.ts';

const UserCacheContext = createContext({} as {
  getUser: (handle: string) => Promise<User>,
});

const UserCacheProvider = ({children}: {children: React.ReactNode}) => {
  const [users, setUsers] = useState(new Map<string, User>());

  const getUser = useCallback(async (handle: string) => {
    if (users.has(handle)) return users.get(handle);

    const {data} = await api.get(`/api/user/${handle}`);

    setUsers(new Map(users.set(handle, data.result)));

    return data.result;
  }, [users])

  return (
    <UserCacheContext.Provider value={{getUser}}>
      {children}
    </UserCacheContext.Provider>
  );
};

export default UserCacheProvider;

export const useUserCache = () => {
  return React.useContext(UserCacheContext);
}
