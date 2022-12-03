import React, { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// import PageNotFound from '@/authentication/PageNotFound';
import ErrorBoundary from '../components/React/Error/ErrorBoundary/ErrorBoundary';
import { RouteProperties } from './props';
import ErrorNotFound from '../components/React/Error/ErrorNotFound';

type RenderRouteProps = RouteProperties;

const RenderRoute = (props: RenderRouteProps) => {
  const { element: Component } = props;

  return (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};

const Redirects = ({ redirects }: { redirects: RouteRedirectProps }) => {
  return (
    <>
      {redirects?.length &&
        redirects.map(
          (path, index) =>
            path && (
              <Navigate
                to={path.to}
                key={index}
                state={{
                  from: path.from
                }}
                replace
              />
            )
        )}
    </>
  );
};

const PrivateRoute = (props: {
  redirectPath?: RouteRedirectProps;
  appRoutes: RouteProperties[];
  animate?: boolean;
}) => {
  const location = useLocation();
  const { appRoutes, redirectPath } = props;

  return (
    <Suspense fallback={<></>}>
      <Routes location={location}>
        {appRoutes?.map((route, index) => (
          <Route path={route.path} key={index} element={<RenderRoute {...route} />}>
            {route?.children?.map((child) => (
              <Route path={child.path} key={child.path} element={<RenderRoute {...child} />} />
            ))}
          </Route>
        ))}
        {/*{redirectPath?.length ? <Route element={<Redirects redirects={redirectPath} />} /> : <></>}*/}
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoute;
