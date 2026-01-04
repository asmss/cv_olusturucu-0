const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
      school:{type:String},
      department:{type:String},
      startDate:{type:String},
      endDate:{type:String}
})

module.exports = educationSchema;