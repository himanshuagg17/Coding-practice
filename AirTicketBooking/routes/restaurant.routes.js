const express=require('express');
const {RestaurantModel}=require("../models/restaurant.model");

const RestaurantRoute=express.Router();

// route to add a restaurant
RestaurantRoute.post("/add",async(req,res)=>{
    const {name,address,menu}=req.body;

    try {
        let restuarant=new RestaurantModel({
            name,
            address,
            menu
        })
        await restuarant.save();
        res.send("The new restuarant has been added");
    } catch (error) {
        res.send(error.message);
    }
})


// get all the restaurants

RestaurantRoute.get("/all",async(req,res)=>{
    try {
        let restaurants=await RestaurantModel.find();
        res.send(restaurants);
        console.log(restaurants);
    } catch (error) {
        res.send(error.message);
    }
})


// get the restaurant based on its id
RestaurantRoute.get("/:id",async(req,res)=>{
    let id=req.params.id;
    try {
        let restaurant=await RestaurantModel.findOne({_id:id});
        res.send(restaurant)
    } catch (error) {
        res.send("there was some error");
    }
})


// add a menu to the restaurant
RestaurantRoute.post("/:id/menu",async(req,res)=>{
    let id=req.params.id;
       

    try {
        let restaurant=await RestaurantModel.findOne({_id:id});
        restaurant.menu.push(req.body);
        await restaurant.save();
        res.send("The menu has been added");
    } catch (error) {
        res.send("There was some error in adding the menu");
    }
})





  

module.exports={
    RestaurantRoute
}