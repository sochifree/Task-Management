const mongoose   = require('mongoose');
const User       = require('../models/userSchema');

const taskSchema = mongoose.Schema({
    taskTitle: {type:String, required: true},
    taskBody: {type: String, required: true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;

