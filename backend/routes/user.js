const express = require("express");
const router = express.Router();

const { checkByUserId } = require("../helpers/checkers");
const { updateUser, getUserData, getNearByUserList } = require("../controllers/user");
const { checkLoggedin, isAuth } = require("../helpers/checkers");

router.put("/update/:userId", checkLoggedin, isAuth, updateUser);
router.get("/co/:userId", checkLoggedin, getUserData);
router.get("/near/:userId", checkLoggedin, getNearByUserList);


router.param("userId", checkByUserId);
module.exports = router;
