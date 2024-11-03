import React, { createContext, useState, useEffect } from "react";
import { URL } from "../URL/URL";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // const connection = () => {
  //   const activeUser = localStorage.getItem("user");
  //   JSON.parse(activeUser);
  // };

  // const register = async (dataForm) => {
  //   console.log("Entree dans la function register");
  //   console.log(dataForm);

  //   setIsLoading(true);

  //   try {
  //     console.log("Entree dans le try de la function Register");
  //     const { data, status } = await axios.post(URL.USER_REGISTER, dataForm);
  //     ///////////////////////////////////////
  //     console.log("Fin du try de la function register");
  //     console.log(data);
  //     /////////////////////////////////////

  //     if (status === 201) {
  //       console.log("rentree dans l'if === 201");
  //     }
  //   } catch (error) {
  //     console.log("Entree dans le catch de la function Register");
  //   }
  // };

  const login = async (dataForm) => {
    console.log("Entree dans login");
    console.log(dataForm);

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
