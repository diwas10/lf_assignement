import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import Home from '../../../core/private/Home';

const Dashboard = lazy(() => import('../../../core/private/dashboard'));
const ErrorNotFound = lazy(() => import('../../../components/React/Error/ErrorNotFound'));
const Patient = lazy(() => import('../../../core/private/Patient'));

export const privateRoutePaths = {
  dashboard: '/',
  patient: '/patient'
};

const PrivateRoutes: RouteObject[] = [
  {
    path: privateRoutePaths.dashboard,
    element: <Dashboard />,
    children: [
      { path: privateRoutePaths.dashboard, element: <Home /> },
      {
        path: privateRoutePaths.patient,
        element: <Patient />
      },
      {
        path: '*',
        element: <ErrorNotFound />
      }
    ]
  }
];

export default PrivateRoutes;
