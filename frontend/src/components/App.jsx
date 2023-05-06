import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Layout from "./Layout.jsx";
import PublicPage from "./PublicPage.jsx";
import LoginPage from "./LoginPage.jsx";
import ChatPage from "./ChatPage.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PublicPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="public" element={<PublicPage />} />
          <Route
            path="chat"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
