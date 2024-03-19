const express = require("express");
const { handelGenerateNewUrl } = require("../controllers/url");

const router = express.Router();

router.post("/", handelGenerateNewUrl);

module.exports = router;