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
        unit_amout: 10,

        product_data: {
          name: "Produit 1",
          description: "Produit Description",
          images: [
            {
              img: "https://cdn.pixabay.com/photo/2017/09/13/09/21/hockey-2744912_1280.jpg",
            },
          ],
        },
      },
    },
  ];

  const handleCheckout = async (e) => {
    e.preventDefault();
    // Line items
    const line_items = panier.map((article) => {
      return {
        quantity: article.quantity,
        price_data: {
          currency: "eur",
          unit_amout: article.price,
          product_data: {
            name: article.name,
            description: article.content,
            images: [article.picture[0].img],
          },
        },
      };
    });
    // Call API
    const { sessionID } = await fetchFromApi("create-checkout-session", {
      body: { line_items, custumer_email: email },
    });

    const { error } = await stripe.redirectToCheckout({ sessionID });

    if (error) console.log(error);
  };

  return (
    <>
      <form onSubmit={handleCheckout}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <button type="submit">Checkout</button>
      </form>
    </>
  );
};

export default StripeCheckout;
