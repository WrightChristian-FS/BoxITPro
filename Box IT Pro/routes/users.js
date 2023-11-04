const express = require("express");
const { check, body } = require("express-validator");

const User = require("../models/users");

const UserController = require("../controllers/users");

const router = express.Router();

router.post(
  "/save-user",
  UserController.postAddUser
);

router.post("/delete-user", UserController.postDeleteUser);

router.get("/get-user", UserController.getUsersByData);

module.exports = router;
