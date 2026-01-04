const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
        name:{type:String,},
        tech:{type:[String],},
        description:{type:String,}
})

module.exports = projectSchema;