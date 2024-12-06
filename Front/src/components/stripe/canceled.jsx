import React from "react";
import Contact from "../../pages/contact/contact";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Canceled = () => {
  return (
    <div>
      <h1>Votre processus à été interrompu veuillez nous contacter !</h1>
      <Button className="bg-white">
        {" "}
        <Link to="/contact"> Contact </Link>
      </Button>
    </div>
  );
};

export default Canceled;
