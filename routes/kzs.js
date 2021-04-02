const express = require("express");
const { kzs } = require("../controllers");

const router = express.Router();

router.post("/kzsBurer", kzs.kzsFeedback);

module.exports = router;
