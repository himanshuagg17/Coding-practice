const express=require("express");
const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const UserRouter=express.Router();


// route to register a new user
UserRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
   
    if(name===""||email===""||password===""){
        alert(`Kindly enter all the details`);
    }
    else{
        bcrypt.hash(password,5,async (err,hashedPassword)=>{
          if(err){
            res.send(err.message);
          }
          else{
            let user=new UserModel({
                name,
                email,
                password:hashedPassword
            })
    
            await user.save();
            res.send("The user has been registered");
          }
        })
        
    }
})



// route to login the registered user

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        res.status(404).send("The user was not found");
      } else {
        // Compare the provided password with the user's hashed password
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(500).send(err.message);
          } else if (result) {

            let token=jwt.sign({userId:user._id},"himanshu")
 
            res.status(200).send({"msg":"The login was successful","token":token});
          } else {
            res.status(401).send("The credentials were wrong");
          }
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

//   UserRouter.patch("/:id/reset",async(req,res)=>{
//     let id=req.params.id;

//     let {newPassword}=req.body;

//     let user=UserModel.findOne({_id:id});
     
//     if(user){
//         let hashPassword=await bcrypt.hash(newPassword,5);
//         user.password=hashPassword;
//         await user.save();
//         res.send("The password has been changed successfully");
//     }
//   })



  UserRouter.patch("/:id/reset", async (req, res) => {
    const id = req.params.id;
    const { newPassword } = req.body;
  
    try {
      // Find the user by ID
      const user = await UserModel.findOne({ _id: id });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10); // Use your preferred hashing method and salt rounds
  
      // Update the user's password in the database
      user.password = hashedPassword;
  
      // Save the updated user data to the database
      await user.save();
  
      res.status(200).send("The password has been changed successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  



module.exports={
    UserRouter
}