const express=require("express");
const { ListingModel } = require("../models/listing.model");
const ListingRouter=express.Router();


// to create a new listing
ListingRouter.post("/create",async(req,res)=>{
    let {title,description,price,category,owner}=req.body;
    // console.log(user);
    let listing=new ListingModel({
        title,
        description,
        price,
        category,
        owner
    })
    // listing=await listing.populate("user","name email");
    await listing.save();
    res.send("the new listing has been created");
})


// get the listing based on a particular id
ListingRouter.get("/:id",async(req,res)=>{
    let listId=req.params.id;

    let listing=await ListingModel.findOne({_id:listId}).populate("owner");
      
    res.send(listing);

})

// get all the listings
ListingRouter.get("/",async(req,res)=>{
    let listings=await ListingModel.find().populate("owner");

    try {
        res.send(listings);
    } catch (error) {
        res.send(error.message);
    }
})

// route to update route details
ListingRouter.patch("/:id",async(req,res)=>{
    
    let listingid=req.params.id;

    let user=await ListingModel.findOne({_id:listingid});

    let payload=req.body;

    if(user){
        user.title=payload.title;
        user.description=payload.description;
        user.price=payload.price;
        user.category=payload.category;
        user.owner=payload.owner;
    }
    await user.save();
    res.send("the listing details has been changed");
})


ListingRouter.delete("/:id",async(req,res)=>{
    let listingId=req.params.id;


    try {
        let deletedListing=await ListingModel.findByIdAndDelete(listingId);

        if(!deletedListing){
            res.send("the listing was not found");
        }
        else{
            res.send("the listing was deleted");
        }
    } catch (error) {
        res.send(error.message);
    }
})




module.exports={
    ListingRouter
}