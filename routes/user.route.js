const { signUp, signIn } = require("../controllers/user.controller");

const userRouter = require("express").Router();

userRouter.route("/signup").post(signUp);

userRouter.route("/signin").post(signIn);

module.exports = userRouter;
