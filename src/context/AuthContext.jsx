import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  //*Get the token from localStorage and set the token state to its value
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(`Stored token: ${storedToken}`);
    if (storedToken) {
      setToken(storedToken);
    }

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  //* Store and remove the token from localstorage according to the token state
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [token, userId]);

  //*Login
  const login = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
  };

  //*Logout
  const logout = () => {
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
