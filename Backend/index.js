import express from "express";
import mongoose from "mongoose";
import User from "./models/Users.js";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user already Exist");
      res.status(400).json({ message: "This email id already exists please try another. " });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log("Error signing up user: ", error);
  }
});
