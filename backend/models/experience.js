const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
     company:{type:String},
     position:{type:String},
     startDate:{type:String},
     endDate:{type:String},
     description:{type:String},
})

module.exports = experienceSchema;