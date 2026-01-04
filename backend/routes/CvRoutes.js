const express = require("express")
const router = express.Router()
const cvController = require("../controllers/CvController")
router.post("/cv_save",cvController.cv_save);
router.get("/cv_get/:id",cvController.getCv);
router.get("/cv/pdfPath/:id",cvController.getPdfPath)
module.exports = router;