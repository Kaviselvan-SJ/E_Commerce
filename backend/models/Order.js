import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  productName: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  userEmail: String, // for logged-in users, if you add auth later
  paymentStatus: { type: String, default: "pending" },
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model("Order", orderSchema);
