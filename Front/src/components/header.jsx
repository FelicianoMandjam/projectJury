import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logout from "../pages/Auth/logout";

import { AuthContext } from "../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import LogoPage from "../../public/images/logo_blog_2.png";

const Header = () => {
  const { isAdmin, isAuthenticated } = useContext(AuthContext);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      bg="light"
      variant="light"
      className="shadow"
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={LogoPage}
            alt="Logo"
            style={{
              width: "50px", // Ajustez la largeur
              height: "50px", // Ajustez la hauteur
              borderRadius: "50%", // Rend l'image ronde
              border: "2px solid #ccc", // Bordure grise, ajustez selon vos besoins
              objectFit: "cover", // Maintient le contenu bien ajusté
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faHouse} />{" "}
              <span className="ms-2">Accueil</span>
            </Nav.Link>
            <Nav.Link href="/ebook">E-BOOK</Nav.Link>
            <Nav.Link href="/blog">BLOG</Nav.Link>
            <Nav.Link href="/contact" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <span className="ms-2">Contact</span>
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {!isAuthenticated && (
              <Nav.Link href="/connexion" className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUser} />{" "}
                <span className="ms-2">Connexion</span>
              </Nav.Link>
            )}
            {isAdmin() && (
              <Nav.Link
                href="/admin/backOffice"
                className="d-flex align-items-center"
              >
                <FontAwesomeIcon className="text-danger" icon={faUserTie} />{" "}
                <span className="ms-2 text-danger">Admin</span>
              </Nav.Link>
            )}
            {isAuthenticated && (
              <div className="d-flex align-items-center">
                <Logout />
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
