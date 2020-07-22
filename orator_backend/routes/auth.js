const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { JWT_SECRET } = require("../keys");
const { transporter } = require("./mailer");
const {
  singUp, signIn,resetPassword,newPassword
} = require("../handlers/authHandler");
const { route } = require("./event");


router.post("/signup", singUp);

router.post("/signin", signIn);
router.post("/reset-password",resetPassword);
router.post("/new-password",newPassword);

module.exports = router;
