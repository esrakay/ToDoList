const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const PORT = 3000;
const date = require(__dirname + "/public/js/date.js");
const ejsMate = require("ejs-mate");
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(methodOverride('_method'));

app.get("/", catchAsync(async (req, res)=> {
    const currentDate = date.getDate();
    const tasks = await Task.find();
    res.render("index", {currentDate, tasks});
}))

app.post("/", catchAsync(async (req, res)=>{
    const {task} = req.body; 
    const newTask = new Task({text: task, checked: false});
    await newTask.save(); 
    res.redirect("/")
}))

app.post("/:id", catchAsync(async (req, res)=> {
    const { id } = req.params;
    const task = await Task.findById(id);
    await task.toggleChecked();
    res.redirect("/");
}))

app.delete("/:id", catchAsync(async (req, res)=> {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    res.redirect("/");
}))

app.all("*", (req, res, next)=> {
    next(new ExpressError(404, "Page not found"))
})

app.use((err, req, res, next) => {
    const {status = 500} = err;
    if (!err.message) err.message = "Oh no, something went wrong";
    res.status(status).send(err.message);
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})