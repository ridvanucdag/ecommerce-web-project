import React, { JSX, Suspense, lazy } from 'react';
import {
  QueryClientProvider as DataProvider,
  QueryClient,
} from '@tanstack/react-query';

const apiClient = new QueryClient();

const ReactContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const loadDevTools = (): JSX.Element | undefined => {
    if (import.meta.env.ENV === 'DEV') {
      const DevTools = lazy(() =>
        import('@tanstack/react-query-devtools').then(module => {
          return { default: module.ReactQueryDevtools };
        })
      );
      return (
        <Suspense fallback={null}>
          <DevTools initialIsOpen />
        </Suspense>
      );
    }
  };

  return (
    <DataProvider client={apiClient}>
      {children}
      {loadDevTools()}
    </DataProvider>
  );
};

export default ReactContextProvider;