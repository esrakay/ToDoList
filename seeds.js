require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("./models/task");

mongoose.connect(`mongodb://${process.env.MONGODB_IP}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`)
.then(() => {
    console.log("MongoDB connected....");
})
.catch(err => {
    console.error("Could not connect to MongoDB:", err);
})

const seedTasks = [
    {
        text: "Do homework",
        checked: false
    }, 
    {
        text: "Do dishes",
        checked: true
    }
]

Task.insertMany(seedTasks)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })

