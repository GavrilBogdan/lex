import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String, // "beverages" | "bites"
  },
  { timestamps: true }
);

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);
