// import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import axios from "axios";

// // URL
// import { URL } from "../../URL/URL";

// // Socket
// import { io } from "socket.io-client";

// // Initialization de la connexion WebSocket coté back
// const socket = io("http://localhost:3001");

// const Home = () => {
//   // Pour afficher les articles socket.IO d'abort
//   const [post, setPost] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [content, setContent] = useState({
//     title: "",
//     content: "",
//   });

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         console.log("Entree dans la requete ");
//         const { data } = await axios.get(URL.POST_GET_ALL);
//         console.log(data.content);
//         setPost(data.content);
//         setPost(data);
//       } catch (error) {
//         console.log("Erreur lors de la requete des posts ");
//       }
//     };
//     fetchPost();

//     // Ecoute de l'evenement "newPublication" de webSocket pour mettre a jour la liste de posts

//     socket.on("newPublication", (newPublication) => {
//       setPost((prevPost) => [...prevPost, newPublication]);
//     });

//     // nettoyage des écouteurs d'évenement lor du demontage du composant

//     return () => {
//       socket.off("newPublication");
//     };
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setContent((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       await axios.post(URL.POST_ADD, content);
//     } catch (error) {
//       console.log("Erreur  posting the post", error);
//     }
//     setIsLoading(false);
//   };
//   return (
//     <>
//       {post &&
//         post.map((item, index) => {
//           // Formater la date et l'heure
//           const createdAt = new Date(item.createdAt);
//           const formattedDate = createdAt.toLocaleDateString("fr-FR", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//           });
//           const formattedTime = createdAt.toLocaleTimeString("fr-FR", {
//             hour: "2-digit",
//             minute: "2-digit",
//           });

//           return (
//             <>
//               <div key={index}>
//                 <h3>{item.title}</h3>
//                 <p>{item.content}</p>
//                 <p>
//                   <small className="text-secondary">
//                     {formattedDate} à {formattedTime}{" "}
//                   </small>
//                 </p>
//                 <Form>
//                   <Form.Group className="mb-3" controlId="">
//                     <Form.Label>Commentaires</Form.Label>
//                     <Form.Control as="textarea" rows={3} />
//                   </Form.Group>
//                 </Form>
//               </div>
//             </>
//           );
//         })}
//     </>
//   );
// };

// export default Home;

/////////////////////////////////////////////////////////////////////////////////////////////////////::

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Spinner,
// } from "react-bootstrap";
// import axios from "axios";
// import { io } from "socket.io-client";

// // URL
// import { URL } from "../../URL/URL";

// const socket = io("http://localhost:3001");

// const Home = ({ isAuthenticated }) => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [commentContent, setCommentContent] = useState({});

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const { data } = await axios.get(`${URL.POST_GET_ALL}?limit=3`);
//         setPosts(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des posts :", error);
//       }
//     };

//     fetchPosts();

//     socket.on("newPublication", (newPublication) => {
//       setPosts((prevPosts) => [newPublication, ...prevPosts.slice(0, 2)]);
//     });

//     return () => {
//       socket.off("newPublication");
//     };
//   }, []);

//   const handleCommentChange = (postId, value) => {
//     setCommentContent((prev) => ({ ...prev, [postId]: value }));
//   };

//   const handleCommentSubmit = async (postId) => {
//     if (!commentContent[postId]) return;

//     setIsLoading(true);

//     try {
//       await axios.post(URL.COMMENT_ADD, {
//         postId,
//         content: commentContent[postId],
//       });

//       const { data } = await axios.get(`${URL.POST_GET_ONE}/${postId}`);
//       setPosts((prevPosts) =>
//         prevPosts.map((post) => (post.id === postId ? data : post))
//       );

//       setCommentContent((prev) => ({ ...prev, [postId]: "" }));
//     } catch (error) {
//       console.error("Erreur lors de l'ajout du commentaire :", error);
//     }

//     setIsLoading(false);
//   };

//   console.log("Utilisateur connecté :", isAuthenticated);

//   return (
//     <Container className="mt-5">
//       <Row>
//         {posts.map((post) => {
//           const createdAt = new Date(post.createdAt);
//           const formattedDate = createdAt.toLocaleDateString("fr-FR", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//           });
//           const formattedTime = createdAt.toLocaleTimeString("fr-FR", {
//             hour: "2-digit",
//             minute: "2-digit",
//           });

//           return (
//             <Col key={post.id} md={6} lg={4}>
//               <Card className="mb-4">
//                 <Card.Body>
//                   <Card.Title>{post.title}</Card.Title>
//                   <Card.Text>{post.content}</Card.Text>
//                   <Card.Text className="text-muted">
//                     Publié le {formattedDate} à {formattedTime}
//                   </Card.Text>

//                   <hr />

//                   <h5>Commentaires</h5>
//                   {post.comments && post.comments.length > 0 ? (
//                     post.comments.map((comment, idx) => (
//                       <Card key={idx} className="mb-2">
//                         <Card.Body>
//                           <Card.Text>{comment.content}</Card.Text>
//                           <Card.Footer className="text-muted">
//                             Publié par {comment.user || "Anonyme"}
//                           </Card.Footer>
//                         </Card.Body>
//                       </Card>
//                     ))
//                   ) : (
//                     <p className="text-muted">Pas encore de commentaires.</p>
//                   )}

//                   {isAuthenticated && (
//                     <Form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         handleCommentSubmit(post.id);
//                       }}
//                     >
//                       <Form.Group className="mb-3">
//                         <Form.Control
//                           as="textarea"
//                           rows={2}
//                           placeholder="Ajoutez un commentaire..."
//                           value={commentContent[post.id] || ""}
//                           onChange={(e) =>
//                             handleCommentChange(post.id, e.target.value)
//                           }
//                           required
//                         />
//                       </Form.Group>
//                       <Button
//                         type="submit"
//                         variant="primary"
//                         disabled={isLoading}
//                       >
//                         {isLoading ? (
//                           <Spinner animation="border" size="sm" />
//                         ) : (
//                           "Commenter"
//                         )}
//                       </Button>
//                     </Form>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           );
//         })}
//       </Row>
//     </Container>
//   );
// };

// export default Home;

/////////////////////////////////////////////////////////////////////////////////////////:

// import React, { useState, useEffect, useContext } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Spinner,
// } from "react-bootstrap";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { URL } from "../../URL/URL";

// const Home = () => {
//   const {
//     user,
//     isAuthenticated,
//     isLoading: authLoading,
//   } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);
//   const [commentContent, setCommentContent] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   // Récupérer les 3 derniers posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const { data } = await axios.get(`${URL.POST_GET_ALL}?limit=3`);
//         setPosts(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des posts :", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Gérer les commentaires
//   const handleCommentChange = (postId, value) => {
//     setCommentContent((prev) => ({ ...prev, [postId]: value }));
//   };

//   const handleCommentSubmit = async (postId) => {
//     if (!commentContent[postId]) return;

//     setIsLoading(true);

//     try {
//       await axios.post(URL.COMMENT_ADD, {
//         postId,
//         content: commentContent[postId],
//       });

//       // Mettre à jour les commentaires du post après ajout
//       const { data } = await axios.get(`${URL.POST_GET_ONE}/${postId}`);
//       setPosts((prevPosts) =>
//         prevPosts.map((post) => (post.id === postId ? data : post))
//       );

//       setCommentContent((prev) => ({ ...prev, [postId]: "" }));
//     } catch (error) {
//       console.error("Erreur lors de l'ajout du commentaire :", error);
//     }

//     setIsLoading(false);
//   };

//   return (
//     <Container className="mt-5">
//       <h1 className="text-center mb-4">Bienvenue sur la page d'accueil</h1>
//       <Row>
//         {posts.map((post) => {
//           const createdAt = new Date(post.createdAt);
//           const formattedDate = createdAt.toLocaleDateString("fr-FR", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//           });
//           const formattedTime = createdAt.toLocaleTimeString("fr-FR", {
//             hour: "2-digit",
//             minute: "2-digit",
//           });

//           return (
//             <Col key={post.id} md={6} lg={4}>
//               <Card className="mb-4">
//                 <Card.Body>
//                   <Card.Title>{post.title}</Card.Title>
//                   <Card.Text>{post.content}</Card.Text>
//                   <Card.Text className="text-muted">
//                     Publié le {formattedDate} à {formattedTime}
//                   </Card.Text>

//                   <hr />

//                   {/* Affichage des commentaires */}
//                   <h5>Commentaires</h5>
//                   {post.comments && post.comments.length > 0 ? (
//                     post.comments.map((comment, idx) => (
//                       <Card key={idx} className="mb-2">
//                         <Card.Body>
//                           <Card.Text>{comment.content}</Card.Text>
//                           <Card.Footer className="text-muted">
//                             Publié par {comment.user?.name || "Anonyme"}
//                           </Card.Footer>
//                         </Card.Body>
//                       </Card>
//                     ))
//                   ) : (
//                     <p className="text-muted">Pas encore de commentaires.</p>
//                   )}

//                   {/* Formulaire pour ajouter un commentaire si l'utilisateur est connecté */}
//                   {isAuthenticated && (
//                     <Form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         handleCommentSubmit(post.id);
//                       }}
//                     >
//                       <Form.Group className="mb-3">
//                         <Form.Control
//                           as="textarea"
//                           rows={2}
//                           placeholder="Ajoutez un commentaire..."
//                           value={commentContent[post.id] || ""}
//                           onChange={(e) =>
//                             handleCommentChange(post.id, e.target.value)
//                           }
//                           required
//                         />
//                       </Form.Group>
//                       <Button
//                         type="submit"
//                         variant="primary"
//                         disabled={isLoading}
//                       >
//                         {isLoading ? (
//                           <Spinner animation="border" size="sm" />
//                         ) : (
//                           "Commenter"
//                         )}
//                       </Button>
//                     </Form>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           );
//         })}
//       </Row>
//       {!isAuthenticated && (
//         <p className="text-center mt-4">
//           Veuillez <strong>vous connecter</strong> pour ajouter des
//           commentaires.
//         </p>
//       )}
//     </Container>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useContext } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Spinner,
// } from "react-bootstrap";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { URL } from "../../URL/URL";

// const Home = () => {
//   const { isAuthenticated } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);
//   const [commentContent, setCommentContent] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   // Récupérer les 3 derniers posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const { data } = await axios.get(`${URL.POST_GET_ALL}?limit=3`);
//         setPosts(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des posts :", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Gérer les commentaires
//   const handleCommentChange = (postId, value) => {
//     setCommentContent((prev) => ({ ...prev, [postId]: value }));
//   };

//   const handleCommentSubmit = async (postId) => {
//     if (!commentContent[postId]) return;

//     setIsLoading(true);

//     try {
//       await axios.post(URL.COMMENT_ADD, {
//         postId,
//         content: commentContent[postId],
//       });

//       // Mettre à jour les commentaires du post après ajout
//       const { data } = await axios.get(`${URL.POST_GET_ONE}/${postId}`);
//       setPosts((prevPosts) =>
//         prevPosts.map((post) => (post.id === postId ? data : post))
//       );

//       setCommentContent((prev) => ({ ...prev, [postId]: "" }));
//     } catch (error) {
//       console.error("Erreur lors de l'ajout du commentaire :", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <h1 className="text-center mb-4">Bienvenue sur la page d'accueil</h1>
//       <Row>
//         {posts.map((post) => {
//           const createdAt = new Date(post.createdAt);
//           const formattedDate = createdAt.toLocaleDateString("fr-FR", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//           });
//           const formattedTime = createdAt.toLocaleTimeString("fr-FR", {
//             hour: "2-digit",
//             minute: "2-digit",
//           });

//           return (
//             <Col key={post.id} md={6} lg={4}>
//               <Card className="mb-4">
//                 <Card.Body>
//                   <Card.Title>{post.title}</Card.Title>
//                   <Card.Text>{post.content}</Card.Text>
//                   <Card.Text className="text-muted">
//                     Publié le {formattedDate} à {formattedTime}
//                   </Card.Text>

//                   <hr />

//                   <h5>Commentaires</h5>
//                   {post.comments && post.comments.length > 0 ? (
//                     post.comments.map((comment, idx) => (
//                       <Card key={idx} className="mb-2">
//                         <Card.Body>
//                           <Card.Text>{comment.content}</Card.Text>
//                           <Card.Footer className="text-muted">
//                             Publié par {comment.user?.name || "Anonyme"}
//                           </Card.Footer>
//                         </Card.Body>
//                       </Card>
//                     ))
//                   ) : (
//                     <p className="text-muted">Pas encore de commentaires.</p>
//                   )}

//                   {isAuthenticated && (
//                     <Form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         handleCommentSubmit(post.id);
//                       }}
//                     >
//                       <Form.Group className="mb-3">
//                         <Form.Control
//                           as="textarea"
//                           rows={2}
//                           placeholder="Ajoutez un commentaire..."
//                           value={commentContent[post.id] || ""}
//                           onChange={(e) =>
//                             handleCommentChange(post.id, e.target.value)
//                           }
//                           required
//                         />
//                       </Form.Group>
//                       <Button
//                         type="submit"
//                         variant="primary"
//                         disabled={isLoading}
//                       >
//                         {isLoading ? (
//                           <Spinner animation="border" size="sm" />
//                         ) : (
//                           "Commenter"
//                         )}
//                       </Button>
//                     </Form>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           );
//         })}
//       </Row>
//       {!isAuthenticated && (
//         <p className="text-center mt-4">
//           Veuillez <strong>vous connecter</strong> pour ajouter des
//           commentaires.
//         </p>
//       )}
//     </Container>
//   );
// };

// export default Home;

/////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { URL } from "../../URL/URL";

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
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <Card.Text className="text-muted">
                    Publié le {formattedDate} à {formattedTime}
                  </Card.Text>

                  <hr />

                  <h5>Commentaires</h5>
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, idx) => (
                      <Card key={idx} className="mb-2">
                        <Card.Body>
                          <Card.Text>{comment.content}</Card.Text>
                          <Card.Footer className="text-muted">
                            Publié par {comment.user?.name || "Anonyme"}
                          </Card.Footer>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p className="text-muted">Pas encore de commentaires.</p>
                  )}

                  {isAuthenticated && (
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
                  )}
                </Card.Body>
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
