const express=require("express");
const { UserRouter } = require("./routes/user.routes");
const { connection } = require("./configs/db");
const { ListingRouter } = require("./routes/listing.routes");
const app=express();
require("dotenv").config();

app.use(express.json());
app.use("/user",UserRouter);
app.use("/listing",ListingRouter);

app.get("/",(req,res)=>{
    res.send("This is the homepage");
})

app.listen(process.env.port,async()=>{
    await connection;
    console.log(`The server is connected at port http://localhost:${process.env.port}`);
})