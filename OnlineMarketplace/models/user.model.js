const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String,
    phone:String,
    listings:{type: mongoose.Schema.Types.ObjectId, ref:"listing"},
    cart:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
    orders:{type:mongoose.Schema.Types.ObjectId,ref:"order"}
})

const UserModel=mongoose.model("user",UserSchema);

module.exports={
    UserModel
}