import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    rating: Number,
    image: String, // 🔥 new
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
