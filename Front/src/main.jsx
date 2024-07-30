import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// CSS
import "./index.css";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY_STRIPE);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </AuthProvider>
  </React.StrictMode>
);
