const express=require("express");
const {OrderModel}=require("../models/orders.model");

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


OrderRouter.get("/:id",async(req,res)=>{
     let orderid=req.params.id;

     let order=await OrderModel.findOne({_id:orderid});

     res.send({"the order details":order});
})


OrderRouter.patch("/:id",async(req,res)=>{
    let orderid=req.params.id;

    

    let order=await OrderModel.findOne({_id:orderid});

    if(order){
        order.status=req.body.status;
        await order.save();
        res.send("the order status has been changed");
    }
    else{
        res.send("enter a valid order id");
    }

})





module.exports={
    OrderRouter
}