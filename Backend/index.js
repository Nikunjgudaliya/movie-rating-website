import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./models/Users.js";
import bcrypt from "bcrypt";
import RatingModel from "./models/Rating.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    }
    // Hash the password
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.status(200).json({ message: "Login successful" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.post("/showmore", async (req, res) => {
  try {
    const { username, rating, moviename } = req.body;

    const newRating = new RatingModel({ username, rating, moviename });
    await newRating.save();

    res.status(201).json({ message: "Rating saved successfully" });
  } catch (error) {
    console.error("Error saving rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
