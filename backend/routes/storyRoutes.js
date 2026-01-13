const express = require("express");
const multer = require("multer");
const Story = require("../models/Story");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


// CREATE STORY (Protected)
router.post("/add", auth, upload.single("image"), async (req, res) => {
    try {
        const newStory = new Story({
            userId: req.user.id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        });

        await newStory.save();
        res.status(200).json({ message: "Story uploaded successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET ALL STORIES
router.get("/", async (req, res) => {
    const stories = await Story.find().populate("userId", "name email");
    res.json(stories);
});

module.exports = router;

