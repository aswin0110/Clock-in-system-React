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
    },
    timerMinutes:{
      type: Number,
      require:true
    },
    timerSeconds:{
      type: Number,
      require:true
    }

})


const trackerModel = mongoose.model('tracker_datas', trackerSchema)
module.exports = trackerModel