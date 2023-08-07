const express =  require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const userControlRouter = require('./routes/userRouter')
const userLoginRouter = require('./routes/loginRouter')
app.use('/users',userControlRouter)
app.use('/login',userLoginRouter)

PORT = 3005

const trackerModel = require('./model/trackerSchema')

app.post('/api/addEmployerStatus', async (req,res)=>{
    try {
        var data = new trackerModel(req.body)
        await data.save()
        res.json({status:'1'})
        // console.log(data);
    } catch (error) {
        res.json({status:error.message})
    }
})

app.get('/getapi', async (req,res)=>{
    try {
        const datas = await trackerModel.find()
        res.json({data:datas})
    } catch (error) {
        res.json({status:error.message})
        
    }
})



app.delete('/getapi', async (req,res)=>{
    try {
        const id = req.body.id
        const data = await trackerModel.findByIdAndDelete({_id:id})
        res.json({status:data})

    } catch (error) {
        res.json({status:error.message})
        
    }
})

app.put('/api/addEmployerStatus', async (req,res)=>{
    try {
        // const timeData = req.body
        // const timeDataId = req.body.id
        console.log('Body: '+req.body);

        
        const findData = await trackerModel.findByIdAndUpdate({_id:req.body._id},{timerMinutes:req.body.timerMinutes , timerSeconds:req.body.timerSeconds})
        findData.save()
        res.status(200).json({status:'1'})
        console.log('updated data: '+ findData);
        
    } catch (error) {
        res.status(404).json({stats:error.message})
        
    }
})

app.get('/api/table/:emailStorage', async (req,res)=>{
    try {
        var email = req.params.emailStorage
        console.log(email);
        const datas = await trackerModel.find({employerEmail:email})
        res.json({data:datas})
        // console.log(datas);

    } catch (error) {
        res.json({status:error.message})
        
    }
    
})

app.listen(PORT, ()=>{
    console.log(`Server started at PORT: ${PORT}`);
})