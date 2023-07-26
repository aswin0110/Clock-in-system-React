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


app.listen(PORT, ()=>{
    console.log(`Server started at PORT: ${PORT}`);
})