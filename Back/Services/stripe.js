import Stripe from "stripe";
import { env } from "../Config/env.js";

const stripe = new Stripe(env.SECRET_KEY_STRIPE);

export default stripe;
