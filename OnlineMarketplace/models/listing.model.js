const mongoose=require("mongoose");

const ListingSchema=mongoose.Schema({
    title:String,
    description:String,
    price:String,
    category:String,
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
})

const ListingModel=mongoose.model("listing",ListingSchema);

module.exports={
    ListingModel
}