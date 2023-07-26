const express =  require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const userControlRouter = require('./routes/userRouter')
app.use('/users',userControlRouter)

PORT = 3005


app.listen(PORT, ()=>{
    console.log(`Server started at PORT: ${PORT}`);
})