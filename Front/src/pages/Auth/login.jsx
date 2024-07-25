import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { URL } from "../../URL/URL";
// import "../../style/home.css";
import axios from "axios";
import Register from "./register";

const Login = () => {
  const [user, setUser] = useState({});
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log("Entree dans le handle submit");
    e.preventDefault();
    login(user);
    document.location.href = "/";
  };

  return (
    <div>
      <h1>Page connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Connexion</button>
      </form>
      <div>
        <small>
          Vous avez pas encore de compte :{" "}
          <a href="/register">Page d'inscription</a>
        </small>
      </div>
    </div>
  );
};

export default Login;
