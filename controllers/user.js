const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Model = require("../models/user.js");
const tokenKey = "gcsn-token+key-2022";
const {signUpValidation,signInValidation} = require('../validation/auth.js');

const signUp = async (req, res) => {
  try {
    // get data
    const { first_name, last_name, email, password } = req.body;
    // check emptiness of input fields
    if (!signUpValidation(first_name, last_name, email, password)) {
      res
        .status(400)
        .json({ success: false, message: "All input is required" });
    }

    // check old user
    const oldUser = await Model.findOne({ email });

    if (oldUser) {
      res
        .status(400)
        .json({ success: false, message: "user already exist, please login" });
    }

    // encrypt password
    const ecryptedPassword = await bcrypt.hash(password, 10); // password, salt
    const user = await Model.create({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(),
      password: ecryptedPassword,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      tokenKey,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json({ success: true, user: user });
  } catch (error) {
    console.log(error.message);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!signInValidation(email, password)) {
      res
        .status(400)
        .json({ success: false, message: "All input is required" });
    }
    // check if user exists on mongoDB
    const user = await Model.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user_id: user._id, email }, tokenKey, {
        expiresIn: "2h",
      });
      user.token = token;
      console.log("Sign In Successfully");
      return res.status(200).json({ success: true, user: user });
    }
    res
      .status("400")
      .json({
        success: false,
        message: "Invalid Credentials (username or password is incorrect!)",
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { signUp, signIn };
