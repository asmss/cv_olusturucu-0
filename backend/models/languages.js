const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    name:{type:[String]},
    level:{type:[String]}
})

module.exports = languageSchema;