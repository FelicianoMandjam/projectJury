import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const AfterContactSend = () => {
  return (
    <div>
      <h1>Votre message a été envoyer avec succées! </h1>
      <h3>Nous reviandrons vers vous dans les plus bref délais.</h3>
      <Link to="/">
        <Button variant="outline-danger">Acceuil</Button>
      </Link>
    </div>
  );
};

export default AfterContactSend;
