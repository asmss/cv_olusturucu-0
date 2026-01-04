const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const path = require('path');
const fs = require('fs'); 

const app = express();
const CVRoutes = require("./routes/CvRoutes");

connectDB();

const pdfsDirPath = path.join(__dirname, 'pdfs');
if (!fs.existsSync(pdfsDirPath)) {
    fs.mkdirSync(pdfsDirPath, { recursive: true });
    console.log("PDFs klasörü oluşturuldu:", pdfsDirPath);
}

app.use(cors({ origin: "*" }));
app.use(express.json());


app.use('/pdfs', express.static(pdfsDirPath));

app.get("/debug-pdfs", (req, res) => {
    try {
        const files = fs.readdirSync(pdfsDirPath);
        res.json({
            status: "Klasör aktif",
            path: pdfsDirPath,
            files_count: files.length,
            files: files
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use("/api", CVRoutes);

app.get("/", (req, res) => {
   res.send("API çalışıyor. Statik dosyalar için /pdfs/dosya_adi.pdf kullanın.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});