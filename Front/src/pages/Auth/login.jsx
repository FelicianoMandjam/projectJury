// import React, { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { Navigate } from "react-router-dom";
// import { useState } from "react";

// const Login = () => {
//   const [userLogin, setUserLogin] = useState({});
//   const { login, user } = useContext(AuthContext);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserLogin((userLogin) => ({ ...userLogin, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Entree dans le handle submit");
//     login(userLogin);
//   };

//   return (
//     <div>
//       <h1>Page connexion</h1>
//       <form id="create-course-form" onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="email"
//           name="email"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           name="password"
//           onChange={handleChange}
//         />
//         <button onClick={handleSubmit}>Connexion</button>
//       </form>
//       <div>
//         <small>
//           Vous avez pas encore de compte :
//           <a href="/register">Page d'inscription</a>
//         </small>
//       </div>
//       {user && <Navigate to="/" replace={true} />}
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Container, Form, Button, Alert, Modal } from "react-bootstrap";

const Login = () => {
  const [userLogin, setUserLogin] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // État pour afficher les erreurs
  const [showCGU, setShowCGU] = useState(false); // État pour afficher le modal CGU
  const { login, user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prevUserLogin) => ({ ...prevUserLogin, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(userLogin);
      setErrorMessage(""); // Réinitialise l'erreur si la connexion réussit
    } catch (error) {
      setErrorMessage("Email ou mot de passe incorrect.");
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Page de Connexion</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Adresse Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Mot de Passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="J'accepte les Conditions Générales d'Utilisation"
            required
          />
          <Button
            variant="link"
            className="p-0"
            onClick={() => setShowCGU(true)}
          >
            Lire les CGU
          </Button>
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Connexion
        </Button>
      </Form>
      <div className="mt-3">
        <small>
          Vous n'avez pas encore de compte ?{" "}
          <a href="/register">Page d'inscription</a>
        </small>
      </div>
      <div className="mt-2">
        <small>
          Mot de passe oublié ?{" "}
          <a href="/contact">Réinitialiser mon mot de passe</a>
        </small>
      </div>
      {user && <Navigate to="/" replace={true} />}

      {/* Modal CGU */}
      <Modal show={showCGU} onHide={() => setShowCGU(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conditions Générales d'Utilisation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            En utilisant notre site, vous acceptez nos termes et conditions
            décrits ici...
          </p>
          <p>
            En accédant et en utilisant ce Site, vous acceptez sans réserve les
            présentes Conditions Générales d'Utilisation . Si vous n’acceptez
            pas ces termes, veuillez ne pas utiliser le Site. 1. Objet Les
            présentes CGU ont pour objet de définir les modalités et conditions
            dans lesquelles les utilisateurs accèdent et utilisent le Site ainsi
            que les services proposés. 2. Accès au Site L’accès au Site est
            gratuit. Toutefois, certains services ou fonctionnalités peuvent
            être soumis à une inscription ou à un paiement. L'utilisateur
            garantit disposer des moyens techniques et informatiques pour
            accéder au Site et en utiliser les services. 3. Inscription et
            Compte Utilisateur Certains services nécessitent la création d’un
            compte utilisateur. Lors de l’inscription, l’utilisateur s’engage à
            fournir des informations exactes et à jour. L’utilisateur est
            responsable de la confidentialité de ses identifiants de connexion.
            Toute action réalisée avec ses identifiants est présumée avoir été
            effectuée par lui. 4. Utilisation du Site L’utilisateur s’engage à
            utiliser le Site dans le respect des lois et réglements en vigueur.
            Il est strictement interdit d’utiliser le Site à des fins
            frauduleuses, illicites ou portant atteinte aux droits des tiers.
            Toute tentative de piratage, de collecte de données ou d’utilisation
            abusive des services sera sanctionnée. 5. Contenu du Site Le contenu
            publié sur le Site, incluant mais sans s’y limiter, les textes,
            images, vidéos, et graphismes, est protégé par les lois relatives à
            la propriété intellectuelle. Toute reproduction, modification,
            distribution ou exploitation du Contenu sans autorisation expresse
            est strictement interdite. 6. Responsabilité Responsabilité de
            l’éditeur : L’éditeur du Site met en œuvre tous les moyens
            raisonnables pour assurer l’exactitude et l’actualisation des
            informations présentées. Cependant, il ne peut garantir l’absence
            d’erreurs ou d’omissions. Responsabilité de l’utilisateur :
            L’utilisateur est seul responsable de l’utilisation qu’il fait des
            informations et services du Site. 7. Protection des Données
            Personnelles Les données collectées via le Site sont traitées dans
            le respect de la réglementation en vigueur, notamment le Règlement
            Général sur la Protection des Données. Pour plus d’informations,
            veuillez consulter notre Politique de Confidentialité. 8. Liens
            Hypertextes Le Site peut contenir des liens vers des sites tiers.
            L’éditeur n’est pas responsable du contenu de ces sites externes.
            Tout lien dirigeant vers le Site depuis un site tiers doit
            préalablement faire l’objet d’une autorisation. 9. Modification des
            CGU L’éditeur se réserve le droit de modifier les présentes CGU à
            tout moment. Les utilisateurs seront informés de ces modifications
            par tout moyen approprié. 10. Loi applicable et juridiction
            compétente Les présentes CGU sont régies par le droit applicable
            dans le pays d’édition du Site. Tout litige sera soumis aux
            juridictions compétentes. 11. Contact Pour toute question relative
            aux présentes CGU ou au Site, vous pouvez nous contacter à l’adresse
            suivante : <a href="/contact">contact@bswebsite.com</a>. Date de
            mise à jour : 01 /12/2024
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCGU(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;
