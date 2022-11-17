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
      name: result.name,
      email: result.email,
      message: "You have been registered successfully!",
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

/*
@desc   Authenticate existing user
@route  POST /api/user/signin
@access Public
*/
exports.signIn = async (req, res) => {
  try {
    let user = await DB.getUserByEmail(req.body.email);
    if (!user) return res.status(400).send("Invalid email or password!");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid email or password!");

    const access_token = await DB.generateJWTToken(user._id, user.email);
    res.status(200).send({ access_token });
  } catch {
    return res.status(400).send(err.message);
  }
};
