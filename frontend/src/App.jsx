import { Route, Routes } from 'react-router-dom';
import ChatPage from './routes/ChatPage.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Layout from './routes/Layout.jsx';
import LoginPage from './routes/LoginPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import RegisterPage from './routes/RegisterPage.jsx';

const App = () => (
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
);

export default App;
