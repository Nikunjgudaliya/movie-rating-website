import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./models/Users.js";
import bcrypt from "bcrypt";
import RatingModel from "./models/Rating.js";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

mongoose.connect("mongodb://localhost:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any users exist in the database
    const existingUsers = await UserModel.find();
    let userId;
    if (existingUsers.length === 0) {
      userId = 1;
    } else {
      const maxUserId = Math.max(...existingUsers.map((user) => user.userId));
      userId = maxUserId + 1;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      userId,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", userId });
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
      res.status(200).json({
        message: "Login successful",
        username: user.username,
        userId: user.userId,
      });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/showmore", async (req, res) => {
  try {
    const {
      userId,
      username,
      rating,
      moviename,
      comment,
      mediaType,
      mediaId,
      day,
      month,
      year,
    } = req.body;

    const ratingId = (await RatingModel.countDocuments()) + 101;

    const newRating = new RatingModel({
      ratingId,
      userId,
      username,
      rating,
      moviename,
      comment,
      mediaType,
      mediaId,
      day,
      month,
      year,
    });
    await newRating.save();

    res.status(201).json({ message: "Rating saved successfully", ratingId });
  } catch (error) {
    console.error("Error saving rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/admin/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/authenticated", async (req, res) => {
  try {
    const authenticated = true;
    res.json({ authenticated });
  } catch (error) {
    console.error("Error checking authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/ratings", async (req, res) => {
  try {
    const { mediaId } = req.query;
    const ratings = await RatingModel.find({ mediaId });
    res.json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/admin/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userRatings = await RatingModel.find({ userId });
    const userDetailsWithRatings = {
      user,
      ratings: userRatings,
    };

    res.json(userDetailsWithRatings);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/admin/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await UserModel.deleteOne({ userId });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/admin/ratings/:ratingId", async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    await RatingModel.deleteOne({ ratingId });

    res.json({ message: "Rating entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting rating entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
