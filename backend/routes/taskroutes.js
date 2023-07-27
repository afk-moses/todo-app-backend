const express = require("express");

const Task = require("../models/taskmodel");

const router = express.Router();

router.get("/api/task",async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.send(tasks);
    }catch(error){
        res.status(500)
        console.log(error);
    }
})

router.get("/api/task/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const taskbyid = await Task.findById(id);
        if(!taskbyid){
            res.status(404).json({msg:"No task with id was found"})
        }
        res.send(taskbyid);
    }catch(error){
        res.status(500).json({msg: error.message});
    }
})

router.post("/api/task",async(req,res) =>{
    try{
        const task = await Task.create(req.body);
        res.send(task);
        console.log(task.json)

    }catch(error){
        res.status(500)
        console.log(error);
    }
})

router.delete("/api/task/:id",async(req,res) =>{
    try{
        const {id} = req.params;
        const taskbyid = await Task.findByIdAndDelete(id);
        if(!taskbyid){
            res.status(404).json({msg:"No task with id was found"})
        }
        res.status(200).send("Task deleted");
    }catch(error){
        res.status(500).json({msg: error.message});
    }
})

router.put("/api/task/:id",async(req,res) =>{
    try{
        const {id} = req.params;
        const taskbyid = await Task.findByIdAndUpdate({_id:id},req.body,{new:true});
        if(!taskbyid){
            return res.status(404).json({msg:"No task with id was found"})
        }
        res.status(200).send("Task updated");
    }catch(error){
        res.status(500).json({msg: error.message});
    }
})

module.exports = router