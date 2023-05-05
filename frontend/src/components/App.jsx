import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import Error from "./Error.jsx";
import Auth from "./Auth.jsx";
import Private from "./Private.jsx";
import Public from "./Public.jsx";
import AuthProvider from "./AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/login",
          element: <Auth />,
        },
        {
          path: "/private",
          element: (
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          ),
        },
        {
          path: "/public",
          element: <Public />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
