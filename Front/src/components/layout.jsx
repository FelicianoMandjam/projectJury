import React from "react";
import Header from "./header";
import Footer from "./footer";
import "../style/home.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div
        className="container-main"
        style={{
          minHeight: "calc(100vh - 150px)",
          padding: "20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
