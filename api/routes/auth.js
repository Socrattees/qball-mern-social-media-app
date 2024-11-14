import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate encryption for password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    //save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(404).send("User not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }
    user.isOnline = true;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//LOGOUT
router.put("/logout", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    user.isOnline = false;
    await user.save();
    res.status(200).json("User is now offline");
  } catch (err) {
    res.status(404).json("Unable to alter online status to 'offline'");
  }
});

export default router;