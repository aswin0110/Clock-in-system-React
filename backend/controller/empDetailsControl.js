const trackerModel =  require('../model/trackerSchema')
const getEmpDetails = async(req,res)=>{
    try{
        console.log(req.body)
        const email = req.body.email;
        console.log('email--->',email)
        // const data = await trackerModel.find({employerEmail:email})
        const data = await trackerModel.find({employerEmail:email})
        res.status(200).json({status:'data Founded',data:data})
        if(!data){
            res.status(401).json({status:'Empty'})
        }
        
        console.log(data)
        

    }
    catch(error){
        res.status(500).json({ status: 'User name incorrect...' });
    }
}

//exporting
module.exports = {getEmpDetails}