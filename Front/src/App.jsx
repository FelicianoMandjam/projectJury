import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importation des pages
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
