import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

import { useState } from "react";

const Login = () => {
  const [userLogin, setUserLogin] = useState({});
  const { login, user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((userLogin) => ({ ...userLogin, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entree dans le handle submit");
    login(userLogin);
  };

  cancelCourse = () => {
    document.getElementById("create-course-form").reset();
  };

  return (
    <div>
      <h1>Page connexion</h1>
      <form id="create-course-form" onSubmit={handleSubmit}>
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
          Vous avez pas encore de compte :
          <a href="/register">Page d'inscription</a>
        </small>
      </div>
      {user && <Navigate to="/" replace={true} />}
    </div>
  );
};

export default Login;
