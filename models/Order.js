import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      default: "pending", // pending, paid, cancelled etc
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
