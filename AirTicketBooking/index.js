const express=require("express");
const app=express();
const {connection}=require("./configs/db");
const { UserRouter } = require("./routes/user.routes");
const {RestaurantRoute}=require("./routes/restaurant.routes");
const { OrderRouter } = require("./routes/order.routes");

app.use(express.json());

app.get("/",(req,res)=>{
    res.send(`This is the home page`);
})

app.use("/user",UserRouter);
app.use("/restaurant",RestaurantRoute);
app.use("/order",OrderRouter);

app.listen(1700,async()=>{
    await connection;
    console.log(`The server is connected at port http://localhost:1700`);
})