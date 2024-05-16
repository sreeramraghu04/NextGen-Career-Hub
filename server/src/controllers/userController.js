import mongoose from "mongoose";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import path from "path";

import User from "../models/userModel";

const salt = bcrypt.genSaltSync(5);
const secretKey = "hdjdfgkk485739dnf";

export const createUser = (req, res) => {
  try {
    let newUser = new User(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    newUser.password = hashedPassword;
    if (req.file) {
      newUser.resumeFile = req.file.path;
    }
    newUser.save();
    res.json({ status: "success" });
  } catch (e) {
    res.status(400).json({ status: "Failed" });
    console.log(`error in user creation -> ${e}`);
  }
};

//LoginAPI for authenticating username and password
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username: username });
    if (userDoc) {
      const authenticated = bcrypt.compareSync(password, userDoc.password);
      if (authenticated) {
        jwt.sign({ username, id: userDoc._id }, secretKey, {}, (err, token) => {
          if (err) throw err;
          res.status(200).json({
            status: "success",
            token: token,
            username: userDoc.username,
            userType: userDoc.userType,
            userID: userDoc._id,
          });
        });
      }
    } else {
      res.status(400).json({ status: "No User Found" });
    }
  } catch (e) {
    res.status(400).json({ status: "Failed" });
    console.log(`error in user creation -> ${e}`);
  }
};

//Get all userprofiles created
export const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).send(`Server Error -> ${e}`);
  }
};

//Get individual user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json({ userData: user });
  } catch (e) {
    res.status(500).send(`Server Error -> ${e}`);
  }
};

//Update individual userprofile
export const updateUserProfile = async (req, res) => {
  try {
    let data = await User.findOneAndUpdate({ _id: req.body }, req.body);
    if (data) {
      res.status(200).json({ status: "Success" });
    } else {
      res.status(500).json({ status: "Failed" });
    }
  } catch (e) {
    res.status(500).json({ status: "Failed" });
    console.log(`Error in updating user profile -> ${e}`);
  }
};

//Delete userprofile
export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let deleted = await User.findByIdAndDelete(userId);
    if (deleted) {
      res.status(200).json({ status: "Success" });
    } else {
      res.status(500).json({ status: "Failed" });
    }
  } catch (e) {
    res.status(500).send(`Server Error -> ${e}`);
  }
};

export const downloadResume = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById({ _id: userId });

    // Check if user and resume file exist
    if (!user || !user.resumeFile) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Set the file path
    let filePath = path.join(__dirname, "..", user.resumeFile);

    // Remove '/src' from the file path
    filePath = filePath.replace(/\/src/g, "");
    console.log(filePath);

    // Send the file as a download attachment
    res.json(filePath);
  } catch (error) {
    console.error("Error downloading resume:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
