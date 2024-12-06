// import React from "react";
// import StripeCheckout from "../../components/stripe/stripe-checkout";

// const Ebook = () => {
//   // Récuperer le produit AXIOS
//   // OnRécupere le composants stripe-checkout.jsx

//   return (
//     <div>
//       <h1>Page produit</h1>
//       <StripeCheckout />
//     </div>
//   );
// };

// export default Ebook;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import StripeCheckout from "../../components/stripe/stripe-checkout";
import { URL } from "../../URL/URL";
import axios from "axios";
import Bookcover from "../../../public/images/Bookcover.png";

const Ebook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      console.log("entree dans le fetch des books");

      try {
        const { data } = await axios.get(URL.PRODUCT_GET_ALL);
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.log("Error get ebooks", error);
      }
    };
    fetchBook();
  }, []);
  return (
    <Container className="mt-5">
      {books.map((book) => (
        <Row className="align-items-center">
          <Col md={6}>
            <Card style={{ width: "20rem" }}>
              <Card.Img
                src={Bookcover} // Remplacez par l'URL réelle de votre image de produit
                alt="Livre physique"
              />
            </Card>
          </Col>
          <Col md={6}>
            <h2>{book.name}</h2>
            <p>{book.description}</p>
            <p>
              <strong>Caractéristiques :</strong>
            </p>
            <ul>
              <h2>{book.price}€</h2>
              <li>Delais de livraison : 3 jours ouvrés</li>
              <li>
                Livre physique , il en reste{" "}
                <strong className="text-danger">{book.stock}</strong>
              </li>
            </ul>
            <StripeCheckout />
          </Col>
        </Row>
      ))}

      <Row className="mt-4">
        <Col>
          <Alert variant="info" className="text-center">
            La version e-book sera bientôt disponible. Restez connecté !
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Ebook;
