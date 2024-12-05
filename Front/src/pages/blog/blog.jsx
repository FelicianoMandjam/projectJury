import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";

import { AuthContext } from "../../context/AuthContext";

// URL
import { URL } from "../../URL/URL";

// Socket
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Blog = () => {
  const { isAdmin } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(URL.POST_GET_ALL);
        setPost(data); // Met à jour avec tous les posts
      } catch (error) {
        console.log("Erreur lors de la récupération des posts :", error);
      }
    };

    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(URL.CATEGORY_GET_ALL);
        setCategory(data);
      } catch (error) {
        console.log("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchPost();
    fetchCategory();

    // Mettre à jour les posts en temps réel via WebSocket
    socket.on("newPublication", (newPublication) => {
      setPost((prevPost) => [newPublication, ...prevPost]); // Ajoute les nouveaux posts en haut
    });

    return () => {
      socket.off("newPublication");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(URL.POST_ADD, content);
      console.log("Post ajouté avec succès");

      // Rafraîchit la liste des posts pour s'assurer qu'elle est à jour
      const { data } = await axios.get(URL.POST_GET_ALL);
      setPost(data);
    } catch (error) {
      console.log("Erreur lors de l'ajout du post :", error);
    }
    setIsLoading(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {isAdmin() ? (
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  Créer une nouvelle publication
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Titre"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contenu</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="content"
                      rows={3}
                      placeholder="Publication"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Select
                      name="categoryId"
                      value={content.categoryId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choisir une catégorie</option>
                      {category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/png, image/jpeg"
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Poster"
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <Card.Title className="text-center text-danger">
                  Toutes les publications
                </Card.Title>
                <p>
                  Acceder au formulaire de contact pour demande de publication
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3 className="text-center">Publications</h3>
          {post.map((item, index) => {
            const createdAt = new Date(item.createdAt);
            const formattedDate = createdAt.toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const formattedTime = createdAt.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.content}</Card.Text>
                  <Card.Text>
                    <strong>Catégorie :</strong>{" "}
                    {item.category ? item.category.name : "Aucune catégorie"}
                  </Card.Text>
                  <Card.Footer className="text-muted">
                    Publié le {formattedDate} à {formattedTime}
                  </Card.Footer>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;
