const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuidv4} = require("uuid");
const PORT = 3000;
const date = require(__dirname + "/public/js/date.js");

let taskList = [
    {
        id: uuidv4(),
        text: "Some task"
    }    
]

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(methodOverride('_method'));

app.get("/", (req, res)=> {
    const currentDate = date.getDate();
    res.render("index", {currentDate, taskList});
})

app.post("/", (req, res)=>{
    let {todo} = req.body;
    if (todo !== "") {
        taskList.push({id: uuidv4(), text: todo});
    }
    res.redirect("/")
})

app.delete("/:id", (req, res)=> {
    let {id} = req.params;
    taskList = taskList.filter(task => task.id !== id);
    res.redirect("/");
})

app.get("*", (req, res)=> {
    res.send("Error");
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})