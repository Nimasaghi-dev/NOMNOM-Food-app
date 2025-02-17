import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  restaurant_id: {
    type: Schema.Types.ObjectId, // Reference to the Restaurant model
    ref: "Restaurant",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
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

// Update `updatedAt` field before saving
reviewSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
