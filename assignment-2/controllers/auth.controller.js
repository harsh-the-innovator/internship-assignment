const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//signup controller
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userFound = await User.findOne({ username })
      .select("username")
      .exec();
    if (userFound) {
      return res.status(422).json({
        message: "User already exist",
      });
    }
    //if all go ok then hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User({
      username,
      password: hashedPassword,
    });

    // save into database
    const result = await user.save();

    res.status(200).json({
      userInfo: {
        username: result.username,
      },
      message: "Signup Successfull",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
