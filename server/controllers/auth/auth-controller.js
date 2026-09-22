const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");


// Register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {


    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = new User({
        userName, email, password: hashPassword
    })
    await newUser.save()
    res.status(200).json({
      success: true,
      message: "Registration Successfully",
    })


  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//logout
//middleware


module.exports = {
  registerUser,

};