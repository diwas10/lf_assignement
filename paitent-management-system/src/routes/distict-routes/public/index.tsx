import Login from '../../../core/public/login';
import { Navigate, RouteObject } from 'react-router-dom';

export const publicRoutePaths = {
  login: '/login',
  register: '/register'
};

const PublicRoutes: RouteObject[] = [
  {
    path: publicRoutePaths.login,
    element: <Login page={'login'} />
  },
  {
    path: publicRoutePaths.register,
    element: <Login page={'signup'} />
  },
  {
    path: '*',
    element: <Navigate to={'/login'} />
  }
];

export default PublicRoutes;
