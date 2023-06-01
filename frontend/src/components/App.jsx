import { Route, Routes } from 'react-router-dom';
import AuthProvider from './AuthProvider.jsx';
import ChatPage from './ChatPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import Layout from './Layout.jsx';
import LoginPage from './LoginPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import RegisterPage from './RegisterPage.jsx';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
