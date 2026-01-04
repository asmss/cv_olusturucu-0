require("dotenv").config();
const CV = require("../models/CV")
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path")
const pdfService = require("../service/pdfService")

exports.cv_save = async (req, res) => {
  try {
    const cvData = new CV({
      ...req.body,
      cv_id: req.body.cv_id,
    });

    const pdfDir = path.join(__dirname, "../pdfs");
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

    const pdfPath = path.join(pdfDir, `${cvData.cv_id}.pdf`);
    cvData.pdfPath = pdfPath;

    await cvData.save();

    await pdfService.generateCV(cvData, pdfPath);

    res.json({ 
      message: "CV başarıyla kaydedildi ve PDF oluşturuldu", 
      pdfPath 
    });

  } catch (error) {
    console.error("CV Kayıt Hatası:", error);
    res.status(500).json({ message: "Hata oluştu", error: error.message });
  }
};

exports.getCv = async(req,res)=>{
    try {
         const cv = await CV.findById(req.params.id)
         if(!cv)
         {
            res.status(404).json({message:"cv bulunamadı"})
         }
       res.status(200).json({message:"cv başarıyla bulundu",data:cv})
    } catch (error) {
        res.status(500).json({message:"cv getirilirken bir hatayla karşılaşıldı",error:error.message})
    }
}

exports.getPdfPath = async(req,res)=>{
    try {
        const cv = await CV.findById(req.params.id);
         if(!cv)
         {
            return res.status(404).json({message:"cv bulunamadı"})
         }        
         const pdf_path = cv.pdfPath;
         if (!pdf_path) {
           return res.status(404).json({ message: "PDF henüz oluşturulmamış" });
         }
         res.status(200).json({message:"pdf yolu bulundu",pdf_path:pdf_path})

    } catch (error) {
          res.status(500).json({
    message: "PDF yolu alınamadı",
    error: error.message
  });
    }


}