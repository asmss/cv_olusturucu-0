require("dotenv").config();
const CV = require("../models/CV")
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path")

exports.cv_save = async (req, res) => {
  try {
    const cv = new CV({
      ...req.body,
      cv_id: req.body.cv_id,
    });

    const pdfDir = path.join(__dirname, "../pdfs");
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
    const pdfPath = path.join(pdfDir, `${cv.cv_id}.pdf`);
    cv.pdfPath = pdfPath;

    await cv.save();

    const doc = new PDFDocument({ 
      margin: 50, 
      size: "A4",
      bufferPages: true 
    });

    const fontRegular = path.join(__dirname, "../font/Roboto-Medium.ttf");
    const fontBold = path.join(__dirname, "../font/Roboto-Bold.ttf");
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    const colors = {
      primary: "#1e293b",    
      secondary: "#3b82f6",  
      text: "#334155",       
      lightText: "#64748b",  
      accent: "#e2e8f0"      
    };

    const renderSectionHeader = (title) => {
      doc.x = 50; 
      doc.moveDown(1);
      doc.fillColor(colors.secondary).font(fontBold).fontSize(12).text(title.toUpperCase(), { characterSpacing: 1 });
      doc.strokeColor(colors.secondary).lineWidth(2).moveTo(50, doc.y + 2).lineTo(80, doc.y + 2).stroke();
      doc.moveDown(1);
    };

    if (cv.personal) {
      doc.fillColor(colors.primary).font(fontBold).fontSize(24).text(cv.personal.name.toUpperCase(), 50, doc.y, { characterSpacing: 1 });
      doc.fillColor(colors.secondary).font(fontRegular).fontSize(14).text(cv.personal.title);
      
      doc.moveDown(0.5);
      doc.fillColor(colors.lightText).fontSize(9).font(fontRegular);
      doc.text(`${cv.personal.email}  •  ${cv.personal.phone}  •  ${cv.personal.location}`);
      doc.text(`LinkedIn: ${cv.personal.linkedin}  •  GitHub: ${cv.personal.github}`);
      
      doc.moveDown(1);
      doc.strokeColor(colors.accent).lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    }

    if (cv.personal?.about) {
      renderSectionHeader("Profil");
      doc.fillColor(colors.text).font(fontRegular).fontSize(10.5).text(cv.personal.about, 70, doc.y, { align: "justify", lineGap: 4, width: 475 });
    }

    if (cv.experience?.length) {
      renderSectionHeader("Deneyimler");
      cv.experience.forEach((e) => {
        const startY = doc.y;
        doc.circle(55, startY + 5, 3).fill(colors.secondary); 
        
        doc.fillColor(colors.primary).font(fontBold).fontSize(11).text(e.position, 70, startY);
        doc.fillColor(colors.secondary).font(fontRegular).fontSize(10).text(e.company);
        doc.fillColor(colors.lightText).fontSize(9).text(`${e.startDate} - ${e.endDate}`);
        
        doc.moveDown(0.4);
        doc.fillColor(colors.text).fontSize(10).text(e.description, { width: 450, lineGap: 3 });
        doc.moveDown(1.2);
      });
    }

    if (cv.education?.length) {
      renderSectionHeader("Eğitim");
      cv.education.forEach((edu) => {
        const startY = doc.y;
        doc.circle(55, startY + 5, 3).fill(colors.accent);
        
        doc.fillColor(colors.primary).font(fontBold).fontSize(11).text(edu.school, 70, startY);
        doc.fillColor(colors.text).font(fontRegular).fontSize(10).text(edu.department);
        doc.fillColor(colors.lightText).fontSize(9).text(`${edu.startDate} - ${edu.endDate}`);
        doc.moveDown(1);
      });
    }

    if (cv.skills?.length) {
      renderSectionHeader("Yetenekler");
      const skillsList = cv.skills.map(s => `${s.skillName} (${s.level})`).join("   •   ");
      doc.fillColor(colors.text).font(fontRegular).fontSize(10).text(skillsList, 70, doc.y, { lineGap: 5, width: 475 });
    }

    if (cv.projects?.length) {
      renderSectionHeader("Projeler");
      cv.projects.forEach((p) => {
        const currentY = doc.y;
        doc.fillColor(colors.primary).font(fontBold).fontSize(11).text(p.name, 70, currentY);
        doc.fillColor(colors.secondary).fontSize(9).text(`Teknolojiler: ${p.tech.join(", ")}`);
        doc.fillColor(colors.text).fontSize(10).moveDown(0.2).text(p.description, { width: 450, lineGap: 2 });
        doc.moveDown(1);
      });
    }

    if (cv.languages?.length) {
        renderSectionHeader("Diller");
        const langText = cv.languages.map(l => `${l.name}: ${l.level}`).join("  |  ");
        doc.fillColor(colors.text).font(fontRegular).fontSize(10).text(langText, 70, doc.y);
    }

    const pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc.fillColor(colors.lightText).fontSize(8).text(`Sayfa ${i + 1} / ${pages.count}`, 0, doc.page.height - 40, { align: "center" });
    }

    doc.end();

    stream.on("finish", () => {
      res.json({ message: "CV başarıyla kaydedildi ve PDF oluşturuldu", pdfPath });
    });

  } catch (error) {
    console.error(error);
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