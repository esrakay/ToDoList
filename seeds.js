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

const seedDB = async () => {
    try {
        const task1 = new Task({text: "Do homework", checked: false});
        const task2 = new Task({text: "Do dishes", checked: true})
        await task1.save(); 
        await task2.save(); 
    } catch (err) {
        console.log("Error during seeding:", err.message);
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

