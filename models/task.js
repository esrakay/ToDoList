const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;