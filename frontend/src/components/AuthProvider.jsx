import { useState } from 'react';
import AuthContext from '../contexts';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (userData) => {
    setLoggedIn(true);
    localStorage.setItem('userId', JSON.stringify(userData));
  };
  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
