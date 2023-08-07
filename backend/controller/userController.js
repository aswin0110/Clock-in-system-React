const userModel =  require('../model/userSchema')
var jwt = require('jsonwebtoken');

//post
const addUser =  async(req,res) => {
    let data;

    try{
        data = await userModel(req.body);
        await data.save();
        res.json({
            status:'success'
        })
    }
    catch(error){
        console.log(error);
    }
    if(!data){
        res.status(404).json({status:'empty'})
    }
}

//get
const getUsers = async(req,res) =>{
    let data
    try{
        data = await userModel.find()
        res.json({
            status : 'success',
            data : data
        })
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
    if(!data){
        res.status(404).json({status:'empty'})
    }
}
//get emplyoyees
const getEmployees = async(req,res) =>{
    let data;
    let emp = 'EMPLOYEE'
    try{
        data = await userModel.find({userType:emp})
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

//add employee
const addEmployee = async(req,res)=>{
    try{
        const { email, password, uname, designation, mobileNo } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Employee Email ID already exists. Please choose a different one.' });
        }
        const newUser = await userModel({
            email,
            password,
            userType: 'EMPLOYEE', // Set userType to 'EMPLOYEE'
            uname,
            designation,
            mobileNo
            
        });
        await newUser.save();
        res.status(201).json({
            status:'success'
        })
    }
    catch(error){
        console.log(error);
    }
    


}

//delete employee
// const deleteEmployee = async(req,res)=>{
//     try{
//         const email = req.body
//         console.log('body-->',req.body);
//         const id = req.body._id
//         console.log('email--->',email);
//         await userModel.findOneAndDelete(email)
//         // await userModel.findByIdAndDelete(req.body)
//         res.json({status:'Deleted...'})
//     }
//     catch(error){
//         console.log(error)
//         res.json({status:'unable to delete'})
//     }
    

// }
const deleteEmployee = async(req,res)=>{
    let id = req.params.id;
    console.log('id-->',id);
    try{
        await userModel.findByIdAndDelete(id);
        res.json({status:'deleted'})
    }
    catch(error){
        console.log(error)
        res.json({status:'unable to delete'})
    }
    
    
}

///update employee
const updateEmployee = async(req,res)=>{
    let id = req.params.id;
    console.log('id-->',id);
    let data;
    try{
         data = await userModel.findByIdAndUpdate(id,req.body);
        res.json({status:'updated'})
    }
    catch(err){
        console.log(error);
        
    }
    if(!data){
        res.status(500).json({status:'unable to update'})
    }
}


//login
const userLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        // const email = req.body.email;
        const user = await userModel.findOne({email});
        console.log(user.password)
        if(user){
            console.log(user);
            console.log(user.password)
            if( await password==user.password){
                var token = jwt.sign({ data: user }, 'secret');
                console.log("token ____", token)
                let resp = {user , token :token}
                res.status(200).json({ status: 'Login successful',data:resp });
                  
            }else{
                return res.status(401).json({status:'Password incorrect'})
            }
            
        }
        // else{
        //     return res.status(401).json({status:'User name incorrect'})
        // }
        if(!user){
            return res.status(401).json({status:'User name incorrect'})
        }
        // res.status(200).json({ status: 'Login successful',data:user });
    }
    catch(error){
        res.status(500).json({ status: 'User name incorrect...' });
    }

}


//exporting
module.exports = {addUser,getUsers,userLogin,getEmployees,addEmployee,deleteEmployee,updateEmployee}