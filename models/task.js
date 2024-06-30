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

taskSchema.methods.toggleChecked = function() {
    this.checked = !this.checked;
    return this.save();
}

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;