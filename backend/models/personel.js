const mongoose = require("mongoose");

const personelSChema = new mongoose.Schema({
     name: {type:String,},
     title:{type:String,},
     email:{type:String,},
     phone:{type:String,},
     github:{type:String,},
     linkedin:{type:String,},
     location:{type:String,},
     about:{type:String,}

})
module.exports = personelSChema;