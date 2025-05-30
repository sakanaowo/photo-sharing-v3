const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../frontend/public/images"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

const { getUserPhotos, uploadPhoto } = require("../controllers/photo.controller");
const { protectRoute } = require("../middleware/auth.middleware");


// get user photos list
router.get("/photoOfUser/:id", getUserPhotos);

router.post("/new", protectRoute, upload.single('photo'), uploadPhoto);

module.exports = router;
