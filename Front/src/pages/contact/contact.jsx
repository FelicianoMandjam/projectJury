import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { URL } from "../../URL/URL.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const hundleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL.CONTACT_POST, user);
      console.log(response);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
    navigate("/messageEnvoye");
  };

  return (
    <>
      <h1>Contact Page</h1>
      <Form onSubmit={hundleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Votre Prénom:</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="firstname"
            placeholder="Prénom"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Votre Nom:</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="lastname"
            placeholder="Nom"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Tel:</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="number"
            name="phone"
            placeholder="0XXXXXXXXX"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="message"
            name="message"
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button type="submit" onSubmit={hundleSubmit} variant="outline-danger">
          Envoyer
        </Button>
      </Form>
    </>
  );
};

export default Contact;
