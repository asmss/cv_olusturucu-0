const mongoose = require("mongoose")
const personel = require("./personel")
const skills = require("./skills")
const experience = require("./experience")
const education = require("./education")
const projects = require("./projects")
const languages = require("./languages")


const cvSchema = new mongoose.Schema({
    cv_id:{type:String,required:true},
    personal: personel,
    skills:[skills],
    experience:[experience],
    education:[education],
    projects:[projects],
    languages:[languages],
    createdAt:{type:Date,default:Date.now}
})
module.exports = new mongoose.model("CV",cvSchema)