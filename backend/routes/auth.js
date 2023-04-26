const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/auth");
const { validateRegister, validateLogin } = require("../helpers/validation");

router.post("/register", ...validateRegister, register);
router.post("/login", ...validateLogin, login);
router.get("/logout", logout);

module.exports = router;
