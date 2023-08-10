const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Custom Middleware
function isAuthenticated(req, res, next) {
    const isAuthenticated = req.session.user_id;

    if (!isAuthenticated) return res.redirect("/signin");

    next();
}

// Add a post
router.post('/post', isAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.session.user_username;
        const userId = req.session.user_id;

        console.log("Logged in user:", author);
        await Post.create({
            title,
            content,
            author,
            userId
        });

        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create a new post.");
    }
});

// Show all posts
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve posts.");
    }
});

// Show a specific post
router.get("/posts/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findByPk(postId, {
            include: User
        });

        if (post) {
            const postData = post.get({ plain: true });
            res.json({
                title: postData.title,
                content: postData.content,
                author: post.User.username,
                createdAt: postData.createdAt
            });
        } else {
            res.json(null);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve post.");
    }
});

module.exports = router;