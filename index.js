const express = require("express")
require("dotenv").config()
const connection = require("./src/db/connect")
const PORT = process.env.PORT
const app = express()
const userRouter = require("./src/routes/userRoute")
const recipieRouter = require("./src/routes/recipeRoute");
const favoriteRouter = require("./src/routes/favoriteRoute");

app.use(express.json())
app.use("/user", userRouter);
app.use("/recipie", recipieRouter);
app.use("/favorites", favoriteRouter);

app.listen(PORT, () => {
    try {
        console.log(`Server is Running on PORT ${PORT}`);
        
    } catch (error) {
        console.log(error);
        
    }
})