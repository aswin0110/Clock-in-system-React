const userModel =  require('../model/userSchema')

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

//exporting
module.exports = {addUser,getUsers}