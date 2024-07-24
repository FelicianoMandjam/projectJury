import React, { createContext, useState, useEffect } from "react";
import { URL } from "../URL/URL";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (dataForm) => {
    console.log("Entree dans login");
    console.log(dataForm);

    setIsLoading(true);
    try {
      console.log("Entrée dans le try de la fonction login");

      const { data, status } = await axios.post(URL.USER_LOGIN, dataForm, {
        withCredentials: true,
      });
      console.log(data);

      if (status === 200) {
        setUser(data);
        console.log(user);

        localStorage.setItem("user", JSON.stringify(user));
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
