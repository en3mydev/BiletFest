const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

app.use(bodyParser.json());
app.use(cors());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "ron",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Server is running on port 3001"));
