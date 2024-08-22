const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const UserRouter = express.Router();

UserRouter.post("/signup", userController.userSignUp);
UserRouter.post("/login", userController.userLogin);
UserRouter.put("/update/profile", authMiddleware.verifyToken, userController.updateUserProfile );

module.exports = UserRouter;