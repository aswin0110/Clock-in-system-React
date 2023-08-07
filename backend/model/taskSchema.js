const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskShema = new Schema({
    task : {
        type : String,
        require : true
    }
})

const taskModel = mongoose.model('task_data',taskShema)
module.exports = taskModel