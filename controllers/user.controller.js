const DB = require("../configs/db.config");

/*
  @desc   Register new user
  @route  POST /api/user/signup
  @access Public
*/
const signUp = async (req, res) => {
  let user = await DB.getUserByEmail(req.body.email);
  if (user) return res.status(400).send("User already registered!");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  if (user.password) user.password = await bcrypt.hash(user.password, 10);

  try {
    const result = await user.save();

    // Email verification
    const verificationToken = await getVerificationToken(result._id);
    const verifyLink = `${process.env.BASE_URL}/user/verify/${verificationToken.userId}/${verificationToken.token}`;
    await sendEmail(
      user.email,
      "Verify Email",
      verifyLink,
      result.name,
      "verifyEmail.ejs"
    );

    res.status(201).send({
      data: {
        name: result.name,
        email: result.email,
        msg: "An Email will be sent to your account to verify!",
      },
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
