import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { URL } from "../../URL/URL";
// import "../../style/home.css";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({});
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <div>
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
        <button>Connexion</button>
      </form>
    </div>
  );
};

export default Login;
