import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { URL } from "../../URL/URL";
import "../../style/home.css";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext); // Vérifie si l'utilisateur est connecté
  const [posts, setPosts] = useState([]);
  const [commentContent, setCommentContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Récupère les 3 derniers posts au chargement
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${URL.POST_GET_ALL}?limit=3`);
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts :", error);
      }
    };

    fetchPosts();
  }, []);

  // Gestion des changements de contenu des commentaires
  const handleCommentChange = (postId, value) => {
    setCommentContent((prev) => ({ ...prev, [postId]: value }));
  };

  // Soumission des commentaires
  const handleCommentSubmit = async (postId) => {
    if (!commentContent[postId]) return;

    setIsLoading(true);

    try {
      // Ajoute un commentaire
      await axios.post(URL.COMMENT_ADD, {
        postId,
        content: commentContent[postId],
      });

      // Rafraîchit les commentaires du post après ajout
      const { data } = await axios.get(`${URL.POST_GET_ONE}/${postId}`);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? data : post))
      );

      // Réinitialise le champ commentaire
      setCommentContent((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Bienvenue sur la page d'accueil</h1>
      <Row>
        {posts.map((post) => {
          const createdAt = new Date(post.createdAt);
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
            <Col key={post.id} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  src={
                    post.image
                      ? `${URL.REACT_APP_BASE_URL}${post.image}`
                      : "https://via.placeholder.com/400x200"
                  }
                  alt="Post Image"
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <Card.Text className="text-muted">
                    Publié le {formattedDate} à {formattedTime}
                  </Card.Text>
                </Card.Body>

                {/* Liste des commentaires */}
                <ListGroup className="list-group-flush">
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, idx) => (
                      <ListGroup.Item key={idx}>
                        <strong>Commentaire :</strong> {comment.content}
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>
                      <em>Pas encore de commentaires.</em>
                    </ListGroup.Item>
                  )}
                </ListGroup>

                {/* Formulaire pour ajouter un commentaire */}
                {isAuthenticated && (
                  <Card.Body>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleCommentSubmit(post.id);
                      }}
                    >
                      <Form.Group className="mb-3">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Ajoutez un commentaire..."
                          value={commentContent[post.id] || ""}
                          onChange={(e) =>
                            handleCommentChange(post.id, e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Commenter"
                        )}
                      </Button>
                    </Form>
                  </Card.Body>
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
      {!isAuthenticated && (
        <p className="text-center mt-4">
          Veuillez <strong>vous connecter</strong> pour ajouter des
          commentaires.
        </p>
      )}
    </Container>
  );
};

export default Home;
