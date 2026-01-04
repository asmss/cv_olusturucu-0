const mongoose = require("mongoose");

const skillsSChema = new mongoose.Schema({
    skillName:{type:String},
    level:{type:String,}
})
module.exports = skillsSChema;