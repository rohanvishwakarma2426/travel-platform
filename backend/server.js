const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();



app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));  // IMPORTANT

// Middlewares
app.use(cors());
app.use(express.json());

// Load Routes
const authRoutes = require("./routes/authRoutes.js");

// Use Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Travel Platform Backend Running...");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

const storyRoutes = require("./routes/storyRoutes");
app.use("/api/stories", storyRoutes);
app.use("/uploads", express.static("uploads"));





