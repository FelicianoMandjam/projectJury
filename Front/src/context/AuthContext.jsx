import React, { createContext, useState, useEffect } from "react";
import { URL } from "../URL/URL";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false); // Gestion du chargement
  const [user, setUser] = useState(null); // Utilisateur connecté

  // Initialisation de l'utilisateur depuis localStorage
  useEffect(() => {
    const initializeUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Correction de JSON.parse
      }
    };
    initializeUser();
  }, []);

  // Connexion de l'utilisateur
  const login = async (dataForm) => {
    console.log("Entree dans login", dataForm);

    setIsLoading(true);
    try {
      const { data, status } = await axios.post(URL.USER_LOGIN, dataForm);

      if (status === 200) {
        setUser(data); // Mise à jour de l'utilisateur connecté
        localStorage.setItem("user", JSON.stringify(data)); // Stockage dans localStorage
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion de l'utilisateur
  const logout = () => {
    console.log("Entree dans le Logout");
    setUser(null); // Réinitialisation de l'utilisateur
    localStorage.removeItem("user"); // Suppression du stockage local
  };

  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = !!user;

  // Vérifie si l'utilisateur est un admin
  const isAdmin = () => {
    return user?.isAdmin === true; // Vérifie le champ `isAdmin`
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isLoading, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
