const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Route to send posts to dashboard
router.get("/dashboard", async (req, res) => {
    try {
        const posts = await Post.findAll();

        // console.log(posts); // Don't need this now - gonna just comment out, just in case I need it again
        res.render("dashboard", { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve posts.");
    }
});

module.exports = router;