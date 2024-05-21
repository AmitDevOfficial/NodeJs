const express = require("express");
const { handelUserSignUp } = require("../controllers/user")

const router = express.Router();

router.post("/", handelUserSignUp)

module.exports = router;