const dotenv = require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");

const app = express();

const cors = require("cors");

const Task = require("./models/taskmodel")
const taskroutes = require("./routes/taskroutes")

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin: "https://todo-tasks-app.onrender.com"
}));

app.use(taskroutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

//routes
app.get("/",(req,res)=>{
    res.send("home page");
})





