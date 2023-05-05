import { useState } from "react";
import AuthContext from "../contexts";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (userData, callback) => {
    setLoggedIn(true);
    localStorage.setItem("userId", JSON.stringify(userData));
    callback();
  };
  const logOut = (callback) => {
    setLoggedIn(false);
    localStorage.removeItem("userId");
    callback();
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
