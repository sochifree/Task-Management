const express     = require('express');
const mongoose    = require('mongoose');
const bcrypt      = require('bcryptjs');
const User        = require('../models/userSchema');
const Task        = require('../models/taskSchema');

const router      = express.Router();

router.get('/', async(req, res)=>{
    try{
        const tasks = await Task.find()
        .select('_id taskTitle taskBody');

        if(!tasks) {
            return res.status(404).json({message: 'No Task found'})
        }
        return res.status(200).json({message:"All Tasks", tasks})
        console.log('All Tasks fetched')
    } catch (err){
        res.status(500).json({message: err.message || "Internal Error"})
    }
});

router.post('/', async(req, res)=>{
   try{
    const task = new Task({
        taskTitle: req.body.taskTitle,
        taskBody: req.body.taskBody,
        user: req.params._id
    });
    const savedTask = await task.save()
     res.status(201).json(savedTask)
     console.log('Task is Recorded')
   } catch (err){
    console.error(err);
    return res.status(500).json({message: 'Internal Error'})
   }
    
});


router.get('/:_id', async(req, res)=>{
    const {_id} = req.params;
try{
    const task = await Task.findById(_id)
    .select('taskBody taskTitle')

    if(!task){
        return res.status(404).json({message: 'No Task found'})
    }
     return res.status(200).json({message:'Task', task});
     console.log("Task is Fetched")

} catch (err){
   return res.status(500).json({message:err.message || 'Internal Error'})
}
});


router.patch('/:_id', async(req, res)=>{
    const {_id } = req.params;
try{
    const task = await Task.findById(_id)

    if(!task){
        return res.status(404).json({message: 'No task found'})
    }

    const updates = req.body; // assuming req.body is a single object with prop. to update and not an array of objects to be updated

    const updatedTask = {...task.toObject(), ...updates};//merge existing task data with update

        await Task.updateOne({_id:_id}, {$set: updatedTask});//Update the task

        //fetch the updated Task after the update
        const updatedTaskDocument = await Task.findById(_id);
    
        res.status(200).json({message: 'Updated Task', updatedTask: updatedTaskDocument})
        console.log('Task is Updated')
    }       catch(err) {
         return res.status(500).json({message:err.message || 'Internal Erro'})
        }
});

router.delete('/:_id', async(req, res)=>{
    const {_id} = req.params;
    try{
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).json({message:'No task found'})
        }

        await Task.deleteOne({_id}); //delete the task
        return res.status(200).json({message: 'Task is Deleted'})
        console.log('Task deleted')
    } catch (err){
       return  res.status(500).json({message: err.message || "Internal Error" })
    }
});

module.exports = router;