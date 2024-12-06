import { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { fetchFromApi } from "../../utils/helpers/stripe";

const StripeCheckout = () => {
  const [email, setEmail] = useState("");

  const stripe = useStripe();
  // const { panier } = useContext(PanierContext);
  const panier = [
    {
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: 1000,
        product_data: {
          name: "Jean",
          description:
            "Sport et Bien-être : Le Guide Ultime pour une Vie Saine et Équilibrée",
          images: [
            "https://cdn.pixabay.com/photo/2018/07/20/10/38/woman-3550357_1280.jpg",
          ],
        },
      },
    },
  ];

  const handleCheckout = async (e) => {
    e.preventDefault();
    // Line items
    const line_items = panier;
    // Call API
    console.log(line_items, email);
    const { sessionId } = await fetchFromApi("create-checkout-session", {
      body: { line_items, customer_email: email },
    });

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) console.log(error);
  };

  return (
    <>
      <form onSubmit={handleCheckout}>
        <label> Votre adresse mail : </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email"
          value={email}
        />
        <button type="submit">Acheter</button>
      </form>
    </>
  );
};

export default StripeCheckout;
