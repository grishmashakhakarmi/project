const User = require("../models/user");
const { check, body } = require("express-validator");

exports.validateRegister = [
  body("full_name").toLowerCase(),
  body("email").toLowerCase(),
  body("blood_group").toUpperCase(),
  check("full_name")
    .not()
    .isEmpty()
    .withMessage("please provide your full name")
    .isAlpha("en-US", (options = { ignore: " " }))
    .withMessage("string contains only letters"),
  check("email")
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Please provide valid email address")
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .notEmpty()
    .withMessage("Password should not be empty"),
  check("blood_group")
    .isIn(["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"])
    .withMessage("Blood group invalid")
    .notEmpty()
    .withMessage("Please provide your blood group"),
  check("coordinates").custom((values) => {
    if (values === undefined) {
      return values;
    }
    if (values.length != 2) {
      return Promise.reject("Must be length 2, latitude and longitude resp");
    }
    return values;
  }),
];

exports.validateLogin = [
  body("email").toLowerCase(),
  check("email")
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Please provide valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password is 8 characters long")
    .notEmpty()
    .withMessage("Password should not be empty"),
];

exports.validatePostCreate = [
  body("condition").toLowerCase(),
  body("problem_name").toLowerCase(),
  check("user").custom((id) => {
    return User.findOne({ _id: id }).catch((err) => {
      return Promise.reject("User not found");
    });
  }),
  check("condition")
    .isIn(["emergency", "urgent", "anytime"])
    .withMessage("Error assigning condition"),
  check("blood_group")
    .isIn(["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"])
    .withMessage("Blood group invalid")
    .notEmpty()
    .withMessage("Please provide your blood group"),
  check("problem_name")
    .isIn(["blood", "kidney", "eyes", "liver", "pancreas", "heart", "lung"])
    .withMessage("not valid problem"),
  check("problem_description")
    .notEmpty()
    .withMessage("Please explain your problem in brief "),
  check("occur_date")
    .not()
    .isDate()
    .withMessage("Invalid date")
    .notEmpty()
    .withMessage("Invalid date"),
  check("contact_number")
    .notEmpty()
    .withMessage("Phone or Hospital phone number require"),
];
exports.validatePostUpdate = [
  body("condition").toLowerCase(),
  body("problem_name").toLowerCase(),
  check("condition")
    .isIn(["emergency", "urgent", "anytime"])
    .withMessage("Error assigning condition"),
  check("blood_group")
    .isIn(["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"])
    .withMessage("Blood group invalid"),
  check("problem_name")
    .isIn(["blood", "kidney", "eyes", "liver", "pancreas", "heart", "lung"])
    .withMessage("not valid problem"),
  check("occur_date").not().isDate().withMessage("Invalid date"),
  check("coordinates").custom((values) => {
    if (values === undefined) {
      return values;
    }
    if (values.length != 2) {
      return Promise.reject("Must be length 2, latitude and longitude resp");
    }
    return values;
  }),
];
