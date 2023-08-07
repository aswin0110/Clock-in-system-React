const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
    project : {
        type : String,
        require : true
    }
})

const projectModel = mongoose.model('project_data',projectSchema)
module.exports = projectModel