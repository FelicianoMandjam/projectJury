import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { URL } from "../URL/URL";

const PostCarousel = () => {
  const [posts, setPosts] = useState([]);

  // Rec les 3 derniers posts
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

  return (
    <Carousel slide={false} className="mt-5">
      {posts.map((post) => {
        const truncatedContent =
          post.content.length > 100
            ? `${post.content.substring(0, 100)}...`
            : post.content;

        return (
          <Carousel.Item key={post.id}>
            <img
              className="d-block w-100"
              src={
                post.image
                  ? `${URL.REACT_APP_BASE_URL}${post.image}`
                  : "https://cdn.pixabay.com/photo/2021/11/10/06/23/workout-6783020_1280.jpg"
              }
              alt={`Slide ${post.title}`}
              style={{
                maxHeight: "400px",
                objectFit: "cover",
                backdropFilter: "blur(10px)",
              }}
            />
            <Carousel.Caption>
              <h3>{post.title}</h3>
              <p>{truncatedContent}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default PostCarousel;
