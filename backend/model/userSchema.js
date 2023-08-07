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
    },
    uname : {
        type : String,
        required : true
    },
    designation : {
        type :String,
        required : false
    },
    mobileNo : {
        type : Number,
        required : false
    },
    employeeId : {
        type : String,
        required : true,
        default: function () {
            // Generate a 6-digit random number
            return Math.floor(100000 + Math.random() * 900000).toString();
        }
    }
})

//exporting
const userModel = mongoose.model('Users',UserSchema);
module.exports = userModel; 
