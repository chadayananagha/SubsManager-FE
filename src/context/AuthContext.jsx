import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  //*Get the token from localStorage and set the token state to its value
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(`Stored token: ${storedToken}`);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  //* Store and remove the token from localstorage according to the token state
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  //*Login
  const login = (newToken) => {
    setToken(newToken);
  };

  //*Logout
  const logout = () => {
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
