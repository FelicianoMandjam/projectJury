import React, { useState } from "react";
import axios from "axios";
import { URL } from "../../URL/URL";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [userRegister, setUserRegister] = useState({});
  const [isRegistered, setIsRegistered] = useState(false); // ajout pour vérifier l'inscription

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserRegister((prevUserRegister) => ({
      ...prevUserRegister,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL.USER_REGISTER, userRegister);
      console.log(response);
      setIsRegistered(true); // mettre à jour l'état en cas de succès
    } catch (error) {
      console.log(error);
      console.log("Impossible de créer l'utilisateur.");
    }
  };

  return (
    <div>
      <h1>Page d'inscription</h1>
      <form onSubmit={handleSubmit}>
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
          placeholder="Picture"
          name="picture"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="Password"
          name="password"
        />
        {/* <input onChange={handleChange} type="text" placeholder="Role" name="role" /> */}
        <button type="submit">S'inscrire</button>
      </form>
      <div>
        <small>
          Vous êtes déjà inscrit : <a href="/connexion">Page de connexion</a>
        </small>
      </div>
      {isRegistered && <Navigate to="/" replace={true} />}
    </div>
  );
};

export default Register;

// import React, { useContext } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { URL } from "../../URL/URL";
// import { Navigate } from "react-router-dom";
// // import { useState } from "react";

// const Register = () => {
//   const [userRegister, setUserRegister] = useState({});
//   const [isRegistered, setIsRegistered] = useState(false);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserRegister((userRegister) => ({ ...userRegister, [name]: value }));
//   };

//   const hundleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(URL.USER_REGISTER, user);
//       console.log(response);
//       setIsRegistered(true);
//     } catch (e) {
//       console.log(e);
//       console.log("impossible de crée l'utilisateur.");
//     }
//   };
//   return (
//     <div>
//       <h1>Page d'inscription</h1>
//       <form onSubmit={hundleSubmit}>
//         <input
//           onChange={handleChange}
//           type="text"
//           placeholder="Username"
//           name="username"
//         />
//         <input
//           onChange={handleChange}
//           type="text"
//           placeholder="FirstName"
//           name="firstName"
//         />
//         <input
//           onChange={handleChange}
//           type="text"
//           placeholder="LastName"
//           name="lastName"
//         />
//         <input
//           onChange={handleChange}
//           type="text"
//           placeholder="picture"
//           name="picture"
//         />
//         <input
//           onChange={handleChange}
//           type="email"
//           placeholder="email"
//           name="email"
//         />
//         <input
//           onChange={handleChange}
//           type="password"
//           placeholder="password"
//           name="password"
//         />
//         {/* <input onChange={handleChange} type="text" placeholder='role' name="role"/> */}
//         <button type="submit"> S'incrire</button>
//       </form>
//       <div>
//         <small>
//           Vous êtes déjà inscrit : <a href="/connexion">Page de connexion</a>
//         </small>
//       </div>
//       {isRegistered && <Navigate to="/" replace={true} />}
//     </div>
//   );
// };

// export default Register;
