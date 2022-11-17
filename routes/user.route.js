const { signUp } = require("../controllers/user.controller");

const userRouter = require("express").Router();

userRouter.route("/signup").post(signUp);

module.exports = userRouter;
