import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './i18n';
import App from './App';
import store from './slices/index.js';

const rollbarConfig = {
  accessToken: '0acfa198449f4a2ca9057cb86f63c3c0',
  environment: 'testenv',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);
