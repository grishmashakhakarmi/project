const express = require("express");
const router = express.Router();

const { checkByUserId, checkByPostId } = require("../helpers/checkers");
const {
  postCreate,
  postUpdate,
  postDelete,
  postList,
  postListById,
} = require("../controllers/post");
const {
  validatePostCreate,
  validatePostUpdate,
} = require("../helpers/validation");
const { checkVerified, checkLoggedin, isAuth } = require("../helpers/checkers");

router.post(
  "/post/create/:userId",
  ...validatePostCreate,
  checkLoggedin,
  isAuth,
  postCreate
);
router.put(
  "/post/update/:postId/:userId",
  ...validatePostUpdate,
  checkLoggedin,
  isAuth,
  postUpdate
);
router.delete(
  "/post/delete/:postId/:userId",
  checkLoggedin,
  isAuth,
  postDelete
);
router.get("/post", /*  checkLoggedin,*/ postList);
router.get("/post/list/:userId", /*  checkLoggedin,*/ postListById); //get  post list by user id

router.param("userId", checkByUserId);
router.param("postId", checkByPostId);
module.exports = router;
