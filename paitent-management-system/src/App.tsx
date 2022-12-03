import { Suspense, useEffect, useState } from 'react';
import Layout from './components/UI/Layouts';
import PrivateRoutes from './routes/distict-routes/private';
import PublicRoutes from './routes/distict-routes/public';
import { useRoutes } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider';
import FallbackLoader from './components/React/Utility/FallbackLoader';

const App: FunctionComponent = () => {
  const [appReady, setAppReady] = useState(false);
  const { isAuthenticated } = useAuth();

  const privateRoutes = useRoutes(PrivateRoutes);
  const publicRoutes = useRoutes(PublicRoutes);

  useEffect(() => {
    setAppReady(true);
  }, []);

  return (
    <Suspense fallback={<FallbackLoader />}>
      {appReady ? (
        <Layout.Wrapper>
          <Layout.Flex horizontal>
            <Layout.Base>{isAuthenticated ? privateRoutes : publicRoutes}</Layout.Base>
          </Layout.Flex>
        </Layout.Wrapper>
      ) : (
        <FallbackLoader />
      )}
    </Suspense>
  );
};

export default App;
