import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ApplicationProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * If set to `true`, the query will refetch on window focus if the data is stale.
       * If set to `false`, the query will not refetch on window focus.
       * If set to `'always'`, the query will always refetch on window focus.
       * Defaults to `true`.
       */
      refetchOnWindowFocus: false,

      /**
       * The time in milliseconds after data is considered stale.
       * If set to `Infinity`, the data will never be considered stale.
       */
      staleTime: 20 * 1000,
      /**
       * If `false`, failed queries will not retry by default.
       * If `true`, failed queries will retry infinitely., failureCount: num
       * If set to an integer number, e.g. 3, failed queries will retry until the failed query count meets that number.
       * If set to a function `(failureCount, error) => boolean` failed queries will retry until the function returns false.
       */
      retry: false
      // enabled: !!getToken()

      //and many more . you can check docs
    }
  }
});

const ApplicationProvider = ({ children }: ApplicationProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer hideProgressBar pauseOnHover autoClose={2000} />
      <BrowserRouter>{children}</BrowserRouter>
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default ApplicationProvider;
