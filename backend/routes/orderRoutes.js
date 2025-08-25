import express from "express";
import Stripe from "stripe";
import { Order } from "../models/Order.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create Payment + Save Order
router.post("/create-order", async (req, res) => {
  try {
    const { product, quantity, userEmail } = req.body;

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * quantity * 100, // Stripe takes in paise
      currency: "inr",
      payment_method_types: ["card"],
    });

    // Create Order in DB (payment pending initially)
    const order = new Order({
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity,
      userEmail,
      paymentStatus: "pending",
      paymentId: paymentIntent.id,
    });

    await order.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed" });
  }
});

export default router;
