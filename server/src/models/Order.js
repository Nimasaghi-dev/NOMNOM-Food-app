import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  // The restaurant this order belongs to (optional — stored as string for flexibility)
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  total_amount: {
    type: Number,
    required: true,
  },
  // Defaults to "pending" so the client doesn't need to send a status field
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "on the way", "delivered"],
    default: "pending",
  },
  // Optional — a mixed order can contain items from multiple categories
  category: {
    type: String,
    enum: ["starter", "main_dish", "desserts", "drinks"],
  },
  // The list of items the user ordered
  items: [
    {
      id: { type: Schema.Types.ObjectId, ref: "Item" },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      imgId: { type: Number },
    },
  ],
  // Delivery address entered at checkout
  address: {
    type: String,
    trim: true,
  },
  // Payment method selected at checkout (e.g. "Cash", "Card")
  paymentMethod: {
    type: String,
    default: "Cash",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Keep updatedAt current whenever the document is saved
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Order", orderSchema);
