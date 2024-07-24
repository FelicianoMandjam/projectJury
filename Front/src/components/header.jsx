import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <div className="header">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/connexion">Connexion</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div></div>
    </>
  );
};

export default Header;
