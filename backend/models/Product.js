import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  imageUrl: String,
  category: String,
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
