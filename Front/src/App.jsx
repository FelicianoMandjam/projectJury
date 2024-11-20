import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importation des pages
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import BackOffice from "./pages/Admin/backOffice";
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
          {/* Pages Blog */}
          <Route index path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/messageEnvoye" element={<AfterContactSend />} />

          {/* Connexion */}
          <Route path="/connexion" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* e-commerce */}
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/canceled" element={<StripeCanceled />} />
          <Route path="/sucess" element={<StripeSucees />} />
          <Route path="/panier" element={<StripeCheckout />} />

          {/* Admin */}
          <Route path="/admin/backOffice" element={<BackOffice />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
