import React, { useState } from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BackOffice = () => {
  // État pour suivre la section actuellement sélectionnée
  const [selectedSection, setSelectedSection] = useState("overview");

  // Fonction pour mettre à jour la section sélectionnée
  const handleNavClick = (section) => {
    setSelectedSection(section);
  };

  // Rendu du contenu principal basé sur la section sélectionnée
  const renderContent = () => {
    switch (selectedSection) {
      case "overview":
        return (
          <>
            <h1>Dashboard Overview</h1>
            <p>
              Bienvenue sur le tableau de bord de l'administrateur. Choisissez
              une section à gauche pour commencer.
            </p>
          </>
        );
      case "users":
        return (
          <>
            <h1>Gestion des Utilisateurs</h1>
            <p>Ici, tu peux gérer les utilisateurs enregistrés sur le site.</p>
            {/* Ajoute le composant ou le contenu de gestion des utilisateurs */}
          </>
        );
      case "posts":
        return (
          <>
            <h1>Gestion des Publications</h1>
            <p>Gère les publications créées par les utilisateurs ici.</p>
            {/* Ajoute le composant ou le contenu de gestion des publications */}
          </>
        );
      case "categories":
        return (
          <>
            <h1>Gestion des Catégories</h1>
            <p>Crée, modifie ou supprime des catégories ici.</p>
            {/* Ajoute le composant ou le contenu de gestion des catégories */}
          </>
        );
      case "products":
        return (
          <>
            <h1>Gestion des Produits</h1>
            <p>Gère les produits ici.</p>
            {/* Ajoute le composant ou le contenu de gestion des produits */}
          </>
        );
      case "settings":
        return (
          <>
            <h1>Paramètres</h1>
            <p>Gère les paramètres du site ici.</p>
            {/* Ajoute le composant ou le contenu des paramètres */}
          </>
        );
      default:
        return (
          <>
            <h1>Dashboard Overview</h1>
            <p>
              Bienvenue sur le tableau de bord de l'administrateur. Choisissez
              une section à gauche pour commencer.
            </p>
          </>
        );
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col xs={2} id="sidebar" className="bg-light vh-100">
          <Navbar
            bg="light"
            expand="lg"
            className="flex-column align-items-start"
          >
            <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
            <Nav className="flex-column w-100">
              <Nav.Link
                href="#overview"
                onClick={() => handleNavClick("overview")}
              >
                Overview
              </Nav.Link>
              <Nav.Link href="#users" onClick={() => handleNavClick("users")}>
                User
              </Nav.Link>
              <Nav.Link href="#posts" onClick={() => handleNavClick("posts")}>
                Posts
              </Nav.Link>
              <Nav.Link
                href="#categories"
                onClick={() => handleNavClick("categories")}
              >
                Categories
              </Nav.Link>
              <Nav.Link
                href="#products"
                onClick={() => handleNavClick("products")}
              >
                Products
              </Nav.Link>
              <Nav.Link
                href="#settings"
                onClick={() => handleNavClick("settings")}
              >
                Settings
              </Nav.Link>
            </Nav>
          </Navbar>
        </Col>

        {/* Main Content */}
        <Col xs={10} id="main-content">
          <Navbar bg="light" className="mb-4">
            <Navbar.Text>Welcome Admin</Navbar.Text>
          </Navbar>
          <Container>{renderContent()}</Container>
        </Col>
      </Row>
    </Container>
  );
};

export default BackOffice;
