import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "on the way", "delivered"],
  },
  category: {
    type: String,
    required: true,
    enum: ["starter", "main_dish", "desserts", "drinks"],
  },
  items: [
    {
      id: { type: Schema.Types.ObjectId, required: true, ref: "Item" },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      imgId: { type: Number, required: true }, // Add imgId here
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook for updating `updatedAt`
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Order", orderSchema);
