const mongoose=require("mongoose");

const ProductSchema=mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    stock:Number
})

const ProductModel=mongoose.model("product",ProductSchema);

module.exports={
    ProductModel
}