const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() =>{
     try {
        await mongoose.connect(process.env.MONGO_URI)
     } catch (error) {
        console.error("mongoDB ye bağlanırken bir sorunla karşılaştın", error);
     }
     console.log("mongoDB ye bağlanıldı database: "+process.env.database_name);

}

module.exports = connectDB;