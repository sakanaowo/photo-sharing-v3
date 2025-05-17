const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
// import { getUserPhotos } from "../controllers/photo.controller";
const { getUserPhotos } = require("../controllers/Photo.controller");

// router.post("/", async (request, response) => {

// });
// get user photos list
router.get("/photoOfUser/:id", getUserPhotos);

module.exports = router;
