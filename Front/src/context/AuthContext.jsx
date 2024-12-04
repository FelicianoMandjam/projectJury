// import React, { createContext, useState, useEffect } from "react";
// import { URL } from "../URL/URL";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [user, setUser] = useState(null);

//   // Vérifie si un utilisateur est connecté
//   useEffect(() => {
//     const initializeUser = () => {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     };
//     initializeUser();
//   }, []);

//   // Connexion
//   const login = async (dataForm) => {
//     console.log("Entree dans login");
//     console.log(dataForm);

//     setIsLoading(true);
//     try {
//       console.log("Entrée dans le try de la fonction login");

//       const { data, status } = await axios.post(URL.USER_LOGIN, dataForm);
//       console.log(data);

//       if (status === 200) {
//         setUser(data);
//         localStorage.setItem("user", JSON.stringify(data));
//         const recupUser = localStorage.getItem("user");
//         JSON.perse(recupUser);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   // Déconnexion
//   const logout = () => {
//     console.log("Entree dans le Logout");
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ login, logout, user, isLoading, isAuthenticated }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

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

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isLoading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
