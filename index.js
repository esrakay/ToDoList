const express = require("express");
const app = express();
const PORT = 3000;
const date = require(__dirname + "/public/js/date.js");
const todoList = ["Do dishes", "Do homework"]

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=> {
    const currentDate = date.getDate();
    res.render("index", {currentDate, todoList});
})

app.post("/", (req, res)=>{
    let {todo} = req.body;
    if (todo !== "") {
        todoList.push(todo);
    }
    res.redirect("/")
})

app.get("*", (req, res)=> {
    res.send("Error");
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})