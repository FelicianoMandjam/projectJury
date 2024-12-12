// import React, { useState } from "react";
// import axios from "axios";
// import { URL } from "../../URL/URL";
// import { Navigate } from "react-router-dom";

// const Register = () => {
//   const [userRegister, setUserRegister] = useState({});
//   const [isRegistered, setIsRegistered] = useState(false); // ajout pour vérifier l'inscription

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserRegister((prevUserRegister) => ({
//       ...prevUserRegister,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(URL.USER_REGISTER, userRegister);
//       console.log(response);
//       setIsRegistered(true); // mettre à jour l'état en cas de succès
//     } catch (error) {
//       console.log(error);
//       console.log("Impossible de créer l'utilisateur.");
//     }
//   };

//   return (
//     <div>
//       <h1>Page d'inscription</h1>
//       <form onSubmit={handleSubmit}>
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
//           type="email"
//           placeholder="Email"
//           name="email"
//         />
//         <input
//           onChange={handleChange}
//           type="password"
//           placeholder="Password"
//           name="password"
//         />
//         {/* <input onChange={handleChange} type="text" placeholder="Role" name="role" /> */}
//         <button type="submit">S'inscrire</button>
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

//////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import axios from "axios";
import { URL } from "../../URL/URL";
import { Navigate } from "react-router-dom";
import { Container, Form, Button, Modal } from "react-bootstrap";

const Register = () => {
  const [userRegister, setUserRegister] = useState({});
  const [isRegistered, setIsRegistered] = useState(false); // Pour vérifier l'inscription
  const [showCGU, setShowCGU] = useState(false); // État pour afficher le modal CGU
  const [acceptedCGU, setAcceptedCGU] = useState(false); // État pour vérifier si CGU est accepté
  const [error, setError] = useState(""); // État pour afficher les erreurs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserRegister((prevUserRegister) => ({
      ...prevUserRegister,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedCGU) {
      setError("Vous devez accepter les CGU pour vous inscrire.");
      return;
    }
    try {
      const response = await axios.post(URL.USER_REGISTER, userRegister);
      console.log(response);
      setIsRegistered(true); // Met à jour l'état en cas de succès
    } catch (error) {
      console.log(error);
      setError("Impossible de créer l'utilisateur.");
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Page d'inscription</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Prénom"
            name="firstName"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            name="lastName"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Adresse email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCGUCheckbox">
          <Form.Check
            type="checkbox"
            label="J'accepte les Conditions Générales d'Utilisation"
            checked={acceptedCGU}
            onChange={(e) => setAcceptedCGU(e.target.checked)}
          />
          <Button
            variant="link"
            className="p-0"
            onClick={() => setShowCGU(true)}
          >
            Lire les CGU
          </Button>
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" type="submit">
          S'inscrire
        </Button>
      </Form>
      <div className="mt-3">
        <small>
          Vous êtes déjà inscrit : <a href="/connexion">Page de connexion</a>
        </small>
      </div>
      {isRegistered && <Navigate to="/" replace={true} />}

      {/* Modal CGU */}
      <Modal show={showCGU} onHide={() => setShowCGU(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conditions Générales d'Utilisation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bienvenue sur BS. En utilisant ce site, vous acceptez les termes et
            conditions suivants...
          </p>
          <p>
            Conditions Générales d'Utilisation (CGU) Bienvenue sur le site BS.
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

export default Register;
