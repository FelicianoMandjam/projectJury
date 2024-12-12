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
import { io } from "socket.io-client";
import PostCarousel from "../../components/PostCarousel";

// Initialise le socket
const socket = io(URL.REACT_APP_BASE_URL);

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [commentContent, setCommentContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const DESCRIPTION_LIMIT = 100; // Limite pour la description

  // Récupération initiale des 3 derniers posts
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

    // Écoute des nouvelles publications
    socket.on("newPublication", (newPublication) => {
      setPosts((prevPost) => [newPublication, ...prevPost.slice(0, 2)]);
    });

    // Écoute des nouveaux commentaires
    socket.on("newComment", ({ postId, comment }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...(post.comments || []), comment],
              }
            : post
        )
      );
    });

    return () => {
      socket.off("newPublication");
      socket.off("newComment");
    };
  }, []);

  // Gestion des changements dans les champs de commentaire
  const handleCommentChange = (postId, value) => {
    setCommentContent((prev) => ({ ...prev, [postId]: value }));
  };

  // Soumission des commentaires
  const handleCommentSubmit = async (postId) => {
    if (!commentContent[postId]) return;

    setIsLoading(true);

    try {
      await axios.post(URL.COMMENT_ADD, {
        postId,
        content: commentContent[postId],
      });
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
      <PostCarousel />
      <hr className="text-danger" />
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

          const truncatedContent =
            post.content.length > DESCRIPTION_LIMIT
              ? `${post.content.substring(0, DESCRIPTION_LIMIT)}...`
              : post.content;

          return (
            <Col key={post.id} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  src={
                    post.image
                      ? `${URL.REACT_APP_BASE_URL}${post.image}`
                      : "https://cdn.pixabay.com/photo/2021/11/10/06/23/workout-6783020_1280.jpg"
                  }
                  alt="Post Image"
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{truncatedContent}</Card.Text>
                  <Card.Text className="text-muted">
                    Publié le {formattedDate} à {formattedTime}
                  </Card.Text>
                </Card.Body>

                {/* Liste des commentaires (tous présents, mais 3 visibles en défilement) */}
                <ListGroup className="list-group-flush">
                  {post.comments && post.comments.length > 0 ? (
                    <div style={{ maxHeight: "150px", overflowY: "scroll" }}>
                      {post.comments.map((comment, idx) => (
                        <ListGroup.Item key={idx}>
                          <strong>Commentaire :</strong> {comment.content}
                        </ListGroup.Item>
                      ))}
                    </div>
                  ) : (
                    <ListGroup.Item>
                      <em>Pas encore de commentaires.</em>
                      {!isAuthenticated && (
                        <p className="text-center mt-4">
                          Veuillez{" "}
                          <strong>
                            <a href="/register">vous connecter</a>
                          </strong>{" "}
                          pour ajouter des commentaires.
                        </p>
                      )}
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
    </Container>
  );
};

export default Home;
