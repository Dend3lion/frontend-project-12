import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './i18n';
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
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>,
);
