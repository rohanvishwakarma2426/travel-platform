const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register API
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashed
        });

        await newUser.save();
        res.status(200).json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login API
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY
        );

        res.status(200).json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
