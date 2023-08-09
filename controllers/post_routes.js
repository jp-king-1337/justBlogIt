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
        console.log(req.session.user_username)
        const author = req.session.user_username;
        const createdOn = new Date();

        console.log(req.session.user_username);
        await Post.create({
            title,
            content,
            author,
            createdOn
        });

        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create a new post.");
    }
});

// router.post("/post", isAuthenticated, async (req, res) => {
//     await Post.create({
//         text: req.body.text,
//         userId: req.session.user_id
//     });

//     res.redirect("/dashboard");
// });

module.exports = router;