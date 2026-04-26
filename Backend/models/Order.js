const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shops: [
      {
        shop: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shop",
          required: true,
        },

        items: [
          {
            food: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Item",
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
          },
        ],

        shopTotal: {
          type: Number,
          required: true,
        },
      },
    ],

    finalTotal: {
      type: Number,
      //required: true,
    },

    deliveryAddress: {
      address: { type: String, required: true },
      latitude: Number,
      longitude: Number,
    },

    status: {
      type: String,
      enum: ["pending", "preparing", "on the way", "delivered", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
      default: "cash",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
