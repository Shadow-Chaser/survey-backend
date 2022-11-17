const DB = require("../configs/db.config");
const { userValidator } = require("../validators/user.validator");
const bcrypt = require("bcrypt");

/*
  @desc   Register new user
  @route  POST /api/user/signup
  @access Public
*/

exports.signUp = async (req, res) => {
  const { error } = await userValidator(req.body);
  if (error) {
    return res.status(422).json({ message: error.message });
  }
  let user = await DB.getUserByEmail(req.body.email);
  if (user) return res.status(400).send("User already registered!");

  user = req.body;
  user.password = await bcrypt.hash(user.password, 10);

  try {
    const result = await DB.createUser(user);

    res.status(201).send({
      data: {
        name: result.name,
        email: result.email,
        message: "You have been registered successfully!",
      },
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
