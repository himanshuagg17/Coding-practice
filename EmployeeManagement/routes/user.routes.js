const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const UserRouter=express.Router();


// the register route
UserRouter.post("/register",async(req,res)=>{
    let {name,email,password,address,phone}=req.body;

    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send("there was some error");
            }
            else{
                let user=new UserModel({
                    name,
                    email,
                    password:hash,
                })
                await user.save();
                res.send("the user has been registered");
            }

        })
    } catch (error) {
        res.send(err.message);
    }
})


// the login route
UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    let user=await UserModel.findOne({email});

    if(user){
        try {
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user._id},"himanshu",{expiresIn:"7d"});
                    res.send({"msg":"the user has been logged in","token":token});
                }
                else{
                    res.send("the password did not match");
                }
            })
        } catch (error) {
            
        }
    }
})


// to show all the users
UserRouter.get("/",async(req,res)=>{
    let users=await UserModel.find();
    res.send(users);
})

// get user by their id
UserRouter.get("/:id",async(req,res)=>{
    let userid=req.params.id;

    let user=await UserModel.findOne({_id:userid});

    res.send(user);
})


// route to update route details
UserRouter.patch("/:id",async(req,res)=>{
    
    let userid=req.params.id;

    let user=await UserModel.findOne({_id:userid});

    let payload=req.body;

    if(user){
        user.name=payload.name;
        user.email=payload.email;
        user.password=payload.password;
    }
    await user.save();
    res.send("the user details has been changed");
})

module.exports={
    UserRouter
}