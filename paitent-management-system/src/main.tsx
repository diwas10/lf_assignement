import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ApplicationProvider from './providers/ApplicationProvider';
import { AuthProvider } from './providers/AuthProvider';
import { AppProvider } from './providers/AppProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApplicationProvider>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </ApplicationProvider>
  </React.StrictMode>
);
