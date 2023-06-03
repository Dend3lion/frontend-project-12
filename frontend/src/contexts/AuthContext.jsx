import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('userId'));
  };

  const [loggedIn, setLoggedIn] = useState(!!getCurrentUser());

  const logIn = (userData) => {
    setLoggedIn(true);
    localStorage.setItem('userId', JSON.stringify(userData));
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
