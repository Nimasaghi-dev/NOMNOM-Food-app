import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema({
  Restaurants_id: {
    type: Schema.Types.ObjectId, // Reference to the Restaurant model
    ref: "Restaurant",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  food_name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["starter", "main_dish", "desserts", "drinks"],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId, // Reference to the Review model
      ref: "Review",
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
  imgId: {
    type: Number,
    required: true,
  },
});

// Update `updatedAt` field before saving
itemSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
