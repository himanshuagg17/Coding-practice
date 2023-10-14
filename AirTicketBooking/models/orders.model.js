const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({

    // to get the data from the user model, we need to access the ObjectId of the user model
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

 // to get the data from the restaurant model, we need to access the ObjectId of the restaurant model 
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant" },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  status: String, // e.g, "placed", "preparing", "on the way", "delivered"
});

const OrderModel=mongoose.model("order",orderSchema);

module.exports={
    OrderModel
}