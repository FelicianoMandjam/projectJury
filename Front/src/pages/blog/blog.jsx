import React, { useState, useEffect } from "react";
import axios from "axios";

// URL
import { URL } from "../../URL/URL";

// Socket
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Blog = () => {
  // Pour afficher les articles socket.IO d'abort
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Entree dans la requete ");
        const { data } = await axios.get(URL.POST_GET_ALL);
        console.log(data.content);
        setPost(data.content);
        setPost(data);
      } catch (error) {
        console.log("Erreur lors de la requete des posts ");
      }
    };
    fetchPost();

    // Ecoute de l'evenement "newPublication" de webSocket pour mettre a jour la liste de posts

    socket.on("newPublication", (newPublication) => {
      setPost((prevPost) => [...prevPost, newPublication]);
    });

    // nettoyage des écouteurs d'évenement lor du demontage du composant

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
    } catch (error) {
      console.log("Erreur  posting the post", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          onChange={handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Publication"
          onChange={handleChange}
        />

        {/* A gerer (multer) */}
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />
        <button disabled={isLoading}>Poster</button>
      </form>
      {post &&
        post.map((item, index) => {
          // Formater la date et l'heure
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
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <p>
                <small className="text-secondary">
                  {formattedDate} à {formattedTime}{" "}
                </small>
              </p>
            </div>
          );
        })}
    </>
  );
};

export default Blog;
