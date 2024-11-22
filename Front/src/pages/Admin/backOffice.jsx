import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Table,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { URL } from "../../URL/URL";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BackOffice = () => {
  // État pour suivre la section actuellement sélectionnée
  const [selectedSection, setSelectedSection] = useState("overview");

  // Pour le CRUD
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // Fonction pour mettre à jour la section sélectionnée
  const handleNavClick = (section) => {
    setSelectedSection(section);
  };

  // Recuperer les Users de ma BDD
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("fetch pour les Users");
      try {
        const { data } = await axios.get(URL.USER_GET_ALL);
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log("Error get users", error);
      }
    };

    fetchUsers();
  }, []);

  // CRUD : DELETE
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/user/${id}`);

      // A revoir******************** Mettre modal de confirmation
      if (users.isAdmin == 0) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert("Impossible de supprimer un adim");
      }
    } catch (error) {
      console.log("Error to Delete user", error);
    }
  };

  // CRUD : UPDATE
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/user/${selectedUser.id}`,
        selectedUser
      );

      setUsers(
        users.map((user) => (user.id === selectedUser.id ? data : user))
      );
      setShowModal(false);
    } catch (error) {
      console.log("Erreur lors de la mise à jour de l’utilisateur", error);
    }
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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleEditUser(user)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Modal pour mettre à jour un utilisateur */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Modifier Utilisateur</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formEditFirstName">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedUser?.firstName || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEditLastName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedUser?.lastName || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEditUserEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={selectedUser?.email || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </Button>
                <Button variant="primary" onClick={handleUpdateUser}>
                  Mettre à jour
                </Button>
              </Modal.Footer>
            </Modal>
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
