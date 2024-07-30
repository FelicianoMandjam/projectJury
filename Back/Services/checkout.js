import stripe from "./stripe.js";
import { env } from "../Config/env.js";

const createCheckoutSession = async (req, res) => {
  const domaineURL = env.WEB_APP_URL;
  const { line_items, customer_email } = req.body;

  if (!line_items || !customer_email) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${domaineURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domaineURL}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["US", "FR", "GB"],
      },
    });
    res.status(200).json({ sessionID: session.id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export default createCheckoutSession;
