const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        default: ""
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    completed: {
        type: Boolean,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    }
});

const task = mongoose.model('task', taskSchema);

module.exports = task;