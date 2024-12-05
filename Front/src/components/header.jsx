import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logout from "../pages/Auth/logout";
import Blog from "../pages/blog/blog";

import { AuthContext } from "../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { isAdmin, isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <div className="header">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">
                  <FontAwesomeIcon icon={faHouse} />
                </Nav.Link>
                <Nav.Link href="/ebook">E-BOOK</Nav.Link>
                <Nav.Link href="/blog">BLOG</Nav.Link>
                <Nav.Link href="/panier">
                  <FontAwesomeIcon icon={faBasketShopping} />
                </Nav.Link>
                <Nav.Link href="/contact">
                  <FontAwesomeIcon icon={faEnvelope} />
                </Nav.Link>

                <Nav.Link href="/connexion">
                  <FontAwesomeIcon icon={faUser} />
                </Nav.Link>

                <Nav.Link href="/admin/backOffice">
                  <FontAwesomeIcon icon={faUserTie} />
                </Nav.Link>

                {isAuthenticated && (
                  <div className="d-flex">
                    <Logout />
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
