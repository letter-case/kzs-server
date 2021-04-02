const express = require("express");
const { kzs } = require("../controllers");

const router = express.Router();

router.post("/burer", kzs.kzsFeedback);

module.exports = router;
