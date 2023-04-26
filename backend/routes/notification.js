const express = require("express");
const router = express.Router();

const { checkByUserId, checkByPostId } = require("../helpers/checkers");
const {notificationList} = require("../controllers/notification");
const { checkVerified, checkLoggedin, isAuth } = require("../helpers/checkers");

router.get("/notification/list/:userId", checkLoggedin, isAuth, notificationList);
router.param("userId", checkByUserId);
module.exports = router;
