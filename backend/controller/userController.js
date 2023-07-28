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
                res.status(200).json({ status: 'Login successful',data:user });
                  
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
module.exports = {addUser,getUsers,userLogin}