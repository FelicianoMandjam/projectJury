import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importation des pages
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import AfterContactSend from "./pages/contact/afterContactSend";
import Ebook from "./pages/eBook/ebook";
import Blog from "./pages/blog/blog";
import StripeCheckout from "./components/stripe/stripe-checkout";
import StripeSucees from "./components/stripe/success";
import StripeCanceled from "./components/stripe/canceled";

// STYLE / BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/canceled" element={<StripeCanceled />} />
          <Route path="/sucess" element={<StripeSucees />} />
          <Route path="/panier" element={<StripeCheckout />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messageEnvoye" element={<AfterContactSend />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
