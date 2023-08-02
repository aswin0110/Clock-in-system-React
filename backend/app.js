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
        console.log(data);
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

app.listen(PORT, ()=>{
    console.log(`Server started at PORT: ${PORT}`);
})