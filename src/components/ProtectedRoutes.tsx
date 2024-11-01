import {useAuth} from '@/context/auth-provider.tsx';
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoutes = () => {
  const {isAuthenticated, isLoading} = useAuth();

  return isAuthenticated ? <Outlet/> : (!isLoading && <Navigate to="/login"/>);
};
export default ProtectedRoutes;
