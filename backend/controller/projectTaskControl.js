const projectModel = require("../model/projectSchema");
const taskModel = require("../model/taskSchema");
// const projectModel = require("../model/taskSchema");

//add project
const addProject = async(req,res)=>{
    let data;
    try{
        data = await projectModel(req.body)
        await data.save()
        res.status(200).json({status:'success'})

    }
    catch{}
}

//add task
const addTask = async(req,res)=>{
    let data;
    try{
        data = await taskModel(req.body)
        await data.save()
        res.status(200).json({status:'success'})

    }
    catch{}
}
//view projects
const getProject = async(req,res)=>{
    try{
        const data = await projectModel.find()
        console.log(data)
        if(data){
            res.status(200).json({status:'success',data:data})
        }else{
            res.status(404).json({status:'empty'})
        }
    }
    catch(error){
        console.log(error);
    }
    
}
//view task'
const getTask = async(req,res)=>{
    try{
        const data = await taskModel.find()
        console.log(data)
        if(data){
            res.status(200).json({status:'success',data:data})
        }else{
            res.status(404).json({status:'empty'})
        }
    }
    catch(error){
        console.log(error);
    }
    
}



module.exports = {addTask,getProject,addTask,addProject,getTask}