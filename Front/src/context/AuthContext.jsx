import React, { createContext, useState, useEffect } from "react";
import { URL } from "../URL/URL";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const connection = () => {
    const activeUser = localStorage.getItem("user");
    JSON.parse(activeUser);
  };

  const login = async (dataForm) => {
    console.log("Entree dans login");
    console.log(dataForm);
    S;

    setIsLoading(true);
    try {
      console.log("Entrée dans le try de la fonction login");

      const { data, status } = await axios.post(URL.USER_LOGIN, dataForm);
      console.log(data);

      if (status === 200) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        const recupUser = localStorage.getItem("user");
        JSON.perse(recupUser);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("Entree dans le Logout");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
