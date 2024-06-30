const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuidv4} = require("uuid");
const PORT = 3000;
const date = require(__dirname + "/public/js/date.js");
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

let taskList = [
    {
        id: uuidv4(),
        text: "Some task",
        isChecked: false,
    }    
]

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(methodOverride('_method'));

app.get("/", async (req, res)=> {
    const currentDate = date.getDate();
    try {
        const tasks = await Task.find();
        res.render("index", {currentDate, tasks});
    } catch (err) {
        console.log(err);
    }
})

app.post("/", async (req, res)=>{
    const {task} = req.body;
    try {
        const newTask = new Task({text: task, checked: false});
        await newTask.save(); 
    } catch (err) {
        console.log(err);
    }
    res.redirect("/")
})

app.post("/:id", (req, res)=> {
    const { id } = req.params;
    task = taskList.filter(task => task.id === id)[0];
    task.isChecked = !task.isChecked;
    res.redirect("/");
})

app.delete("/:id", (req, res)=> {
    const { id } = req.params;
    taskList = taskList.filter(task => task.id !== id);
    res.redirect("/");
})

app.get("*", (req, res)=> {
    res.send("Error");
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})