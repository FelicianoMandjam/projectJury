import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  Form,
  Modal,
  Navbar,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { URL } from "../../URL/URL";

const BackOffice = () => {
  // State for Users, Posts, Categories, Products, Comments, and Contacts
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "" });
  const [deleteItem, setDeleteItem] = useState(null);
  const [activeSection, setActiveSection] = useState("users");

  // Load Users from API
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

  // Load Posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("fetch pour les Posts");
      try {
        const { data } = await axios.get(URL.POST_GET_ALL);
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log("Error get posts", error);
      }
    };
    fetchPosts();
  }, []);

  // Load Categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      console.log("fetch pour les Categories");
      try {
        const { data } = await axios.get(URL.CATEGORY_GET_ALL);
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.log("Error get categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Load Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("fetch pour les Produits");
      try {
        const { data } = await axios.get(URL.PRODUCT_GET_ALL);
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log("Error get products", error);
      }
    };
    fetchProducts();
  }, []);

  // CRUD Handlers for Categories and Products
  const handleCreateItem = async (type) => {
    if (!newItem.name) {
      alert("Le champ nom est obligatoire.");
      return;
    }
    try {
      const response = await axios.post(
        URL[type.toUpperCase() + "_ADD"],
        newItem
      );
      switch (type) {
        case "category":
          setCategories([...categories, response.data]);
          break;
        case "product":
          setProducts([...products, response.data]);
          break;
        default:
          break;
      }
      setNewItem({ name: "" });
    } catch (error) {
      console.error(`Erreur lors de la création de l'élément (${type})`, error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      const { type, id } = deleteItem;
      await axios.delete(`${URL[type.toUpperCase() + "_DELETE"]}/${id}`);
      switch (type) {
        case "user":
          setUsers(users.filter((item) => item.id !== id));
          break;
        case "post":
          setPosts(posts.filter((item) => item.id !== id));
          break;
        case "category":
          setCategories(categories.filter((item) => item.id !== id));
          break;
        case "product":
          setProducts(products.filter((item) => item.id !== id));
          break;
        default:
          break;
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'élément`, error);
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem({ ...item });
    setShowModal(true);
  };

  const handleUpdateItem = async (type) => {
    try {
      const response = await axios.put(
        `${URL[type.toUpperCase() + "_UPDATE"]}/${selectedItem.id}`,
        selectedItem
      );
      switch (type) {
        case "user":
          setUsers(
            users.map((item) =>
              item.id === selectedItem.id ? response.data : item
            )
          );
          break;
        case "post":
          setPosts(
            posts.map((item) =>
              item.id === selectedItem.id ? response.data : item
            )
          );
          break;
        case "category":
          setCategories(
            categories.map((item) =>
              item.id === selectedItem.id ? response.data : item
            )
          );
          break;
        case "product":
          setProducts(
            products.map((item) =>
              item.id === selectedItem.id ? response.data : item
            )
          );
          break;
        default:
          break;
      }
      setShowModal(false);
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour de l'élément (${type})`,
        error
      );
    }
  };

  const confirmDelete = (type, id) => {
    setDeleteItem({ type, id });
    setShowDeleteModal(true);
  };

  return (
    <div className="d-flex">
      <Navbar
        bg="secondary"
        variant="dark"
        className="flex-column p-3"
        style={{ height: "100vh", width: "250px" }}
      >
        <Navbar.Brand> Dashboard </Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Link onClick={() => setActiveSection("users")}>
            Gestion des Utilisateurs
          </Nav.Link>
          <Nav.Link onClick={() => setActiveSection("posts")}>
            Gestion des Publications
          </Nav.Link>
          <Nav.Link onClick={() => setActiveSection("categories")}>
            Gestion des Catégories
          </Nav.Link>
          <Nav.Link onClick={() => setActiveSection("products")}>
            Gestion des Produits
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <h1>Gestion des Utilisateurs, Publications, Catégories, et Produits</h1>
        {activeSection === "users" && (
          <div>
            <h2>Gestion des Utilisateurs</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nom d'utilisateur</th>
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
                        onClick={() => handleEditItem(user)}
                      >
                        Modifier
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => confirmDelete("user", user.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {activeSection === "posts" && (
          <div>
            <h2>Gestion des Publications</h2>
            <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Contenu</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>{post.content}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => handleEditItem(post)}
                        >
                          Modifier
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => confirmDelete("post", post.id)}
                        >
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}

        {activeSection === "categories" && (
          <div>
            <h2>Gestion des Catégories</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleEditItem(category)}
                      >
                        Modifier
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => confirmDelete("category", category.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Form>
              <Form.Group controlId="formItemName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez le nom"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => handleCreateItem("category")}
              >
                Créer Catégorie
              </Button>
            </Form>
          </div>
        )}

        {activeSection === "products" && (
          <div>
            <h2>Gestion des Produits</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prix</th>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleEditItem(product)}
                      >
                        Modifier
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => confirmDelete("product", product.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez le nom"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Entrez le prix"
                  value={newItem.price || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez une description"
                  value={newItem.description || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Entrez le stock"
                  value={newItem.stock || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, stock: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => handleCreateItem("product")}
              >
                Créer Produit
              </Button>
            </Form>
          </div>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier l'Élément</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEditItemName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.name || ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, name: e.target.value })
                  }
                />
              </Form.Group>
              {activeSection === "users" && (
                <>
                  <Form.Group controlId="formEditUserFirstName">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedItem?.firstName || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEditUserLastName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedItem?.lastName || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEditUserEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={selectedItem?.email || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}
              {activeSection === "posts" && (
                <>
                  <Form.Group controlId="formEditPostTitle">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedItem?.title || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          title: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEditPostContent">
                    <Form.Label>Contenu</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={selectedItem?.content || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          content: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}
              {activeSection === "products" && (
                <>
                  <Form.Group controlId="formEditProductPrice">
                    <Form.Label>Prix</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedItem?.price || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          price: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEditProductDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedItem?.description || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formEditProductStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedItem?.stock || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          stock: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={() => handleUpdateItem(activeSection)}
            >
              Mettre à jour
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for Confirming Deletion */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation de Suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Voulez-vous vraiment supprimer cet élément ? Cette action est
            irréversible.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Annuler
            </Button>
            <Button variant="danger" onClick={handleDeleteItem}>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default BackOffice;
