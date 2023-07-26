const mongoose = require('mongoose');

//connection
mongoose.connect('mongodb+srv://rahulvmrdk:rahul@cluster0.tkapjnb.mongodb.net/timeTracker?retryWrites=true&w=majority')
.then(()=>{
    console.log('DB connected')
})
.catch((err)=>console.log(err))

//schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    userType : {
        type : String,
        enum : ['ADMIN','EMPLOYEE'],
        required : true
    }
})

//exporting
const userModel = mongoose.model('Users',UserSchema);
module.exports = userModel; 
