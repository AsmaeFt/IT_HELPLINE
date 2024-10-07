const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//CREATE USERS

exports.createUsers = async (req, res) => {
  try {
    const NewUser = User.createFromRequestBody(req.body);

    const validRoles = ["adminIT", "itTechnician", "superUsers"];
    if (!validRoles.includes(NewUser.role)) {
      return res.status(400).json({ error: "Invalid Role" });
    }

    const existUser = await User.findOne({ userID: NewUser.userID });
    if (existUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    if (NewUser.role === "adminIT") {
      const adminCount = await User.countDocuments({ role: "adminIT" });
      if (adminCount > 0) {
        return res.status(409).json({ error: "Only one admin allowed" });
      }
    }

    if (NewUser.role === "itTechnician") {
      const technicianCount = await User.countDocuments({
        role: "itTechnician",
      });
      if (technicianCount >= 3) {
        return res
          .status(409)
          .json({ error: "Maximum of 3 technicians allowed" });
      }
    }

    const newUser = new User(NewUser);

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Login In

exports.logIn = async (req, res) => {
  const { userID, passWord } = req.body;

  if (!userID || !(typeof userID === "string") || !passWord) {
    return res.status(400).json({ error: "User ID and password are required" });
  }

  try {
    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials user " });
    }

    const isMatch = await bcrypt.compare(passWord, user.passWord);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials password" });
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: `Hello and welcome back, ${user.firstName}!`,
      token,
      user: {
        id: user._id,
        userName: `${user.firstName} ${user.lasttName}`,
        role: user.role,
        department: user.departemnet,
      },
    });
  } catch (err) {
    console.error("Error during login: ", err);
    return res
      .status(500)
      .json({ error: "Server error, please try again later" });
  }
};

exports.getUsers = async (req , res)=>{
  try {
    const users = await User.find({}).select("-passWord");
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
