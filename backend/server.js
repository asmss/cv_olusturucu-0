const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const CVRoutes = require("./routes/CvRoutes")

connectDB();

app.use(cors({
    origin:"*"
}))

app.use(express.json());
app.use("/api",CVRoutes)
app.use("/",(req,res)=>{
   res.send("API çalışıyor")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,"0.0.0.0",()=>{
    console.log("sunucu çalışıyor port: "+PORT)
})