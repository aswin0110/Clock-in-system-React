const mongoose = require('mongoose')

const Schema = mongoose.Schema



  
const trackerSchema = new Schema({
    employerEmail:{
      type: String,
      require:true
    },
    project:{
        type: String,
        require:true
      },
    task:{
       type: String,
        require:true
      },
    jobDescription:{
      type: String,
      require:true
      },
    modeOfWork:{
      type: String,
      require:true
      },
      timestamp: {
        type: Date,
        default: Date.now
    }
})


const trackerModel = mongoose.model('Tracker_Data', trackerSchema)
module.exports = trackerModel