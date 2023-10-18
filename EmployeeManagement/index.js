const express=require("express");
const { UserRouter } = require("./routes/user.routes");
const { connection } = require("./configs/db");
const app=express();
require("dotenv").config();

app.use(express.json());
app.use("/user",UserRouter);

app.get("/",(req,res)=>{
    res.send("This is the homepage");
})

app.listen(process.env.port,async()=>{
    await connection;
    console.log(`The server is connected at port http://localhost:${process.env.port}`);
})