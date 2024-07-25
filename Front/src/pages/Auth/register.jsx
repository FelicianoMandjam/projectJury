import React from "react";
import { useState } from "react";
import axios from "axios";
import { URL } from "../../URL/URL";

const Register = () => {
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const hundleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(URL.USER_REGISTER, user);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    document.location.href = "/connexion";
  };
  return (
    <div>
      <h1>Page d'inscription</h1>
      <form onSubmit={hundleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Username"
          name="username"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="FirstName"
          name="firstName"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="LastName"
          name="lastName"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="picture"
          name="picture"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          name="email"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          name="password"
        />
        {/* <input onChange={handleChange} type="text" placeholder='role' name="role"/> */}
        <button type="submit"> S'incrire</button>
      </form>
      <small>
        Vous êtes déjà inscrit : <a href="/connexion">Page de connexion</a>
      </small>
    </div>
  );
};

export default Register;
