const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Accommodation type is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    weeklyDiscount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    cleaningFee: {
      type: Number,
      min: 0,
      default: 0,
    },
    serviceFee: {
      type: Number,
      min: 0,
      default: 0,
    },
    occupancyTaxes: {
      type: Number,
      min: 0,
      default: 0,
    },
        host: {
            type: String,
            required: true,
            trim: true,
        },
        hostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        hostDescription: {
      type: String,
      default: "",
      trim: true,
    },
    enhancedCleaning: {
      type: Boolean,
      default: false,
    },
    selfCheckIn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Accommodation", accommodationSchema);
