const express = require("express");
const { migrateComments } = require("../controllers/test.controller");
const router = express.Router();

router.post("/migrateComments", migrateComments)

module.exports = router;