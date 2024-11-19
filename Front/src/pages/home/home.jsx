import React, { useState, useEffect } from "react";
import axios from "axios";

// URL
import { URL } from "../../URL/URL";

// Socket
import { io } from "socket.io-client";

// Initialization de la connexion WebSocket coté back
const socket = io("http://localhost:3001");

const Home = () => {
  // Pour afficher les articles socket.IO d'abort
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState({
    name: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Entree dans la requete ");
        const { data } = await axios.get(URL.POST_GET_ALL);
        console.log(data);
        setPost(data);
      } catch (error) {
        console.log("Erreur lors de la requete des posts ");
      }
    };
    fetchPost();
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
      <form onSubmit={handleChange}>
        <input
          type="text"
          name="content"
          placeholder="post"
          onChange={handleChange}
        />
        <button disabled={isLoading}>Poster</button>
      </form>
    </>
  );
};

export default Home;
