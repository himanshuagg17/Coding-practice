const express=require("express");
const {OrderModel}=require("../models/orders.model");
const {UserModel}=require("../models/user.model");

// we have taken the restaurant model here because we want the data from the restaurant model to be used in the orders model.
const {RestaurantModel}=require("../models/restaurant.model")
const OrderRouter=express.Router();

OrderRouter.post("/create",async (req,res)=>{
    try {
        const { user, restaurant, items, totalPrice, deliveryAddress, status } = req.body;
        let order = new OrderModel({
            user,
            restaurant,
            items,
            totalPrice,
            deliveryAddress,
            status,
        });
        order = await order.populate("user", "-password");
        order = await order.populate("restaurant", "name address");
        await order.save();

        res.status(201).json({ message: "New Order placed", order })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong at placing order",
        });
    }

})








module.exports={
    OrderRouter
}