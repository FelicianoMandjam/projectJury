import React from "react";
import StripeCheckout from "../../components/stripe/stripe-checkout";

const Ebook = () => {
  // Récuperer le produit AXIOS
  // OnRécupere le composants stripe-checkout.jsx

  return (
    <div>
      <h1>Page produit</h1>
      <StripeCheckout />
    </div>
  );
};

export default Ebook;
