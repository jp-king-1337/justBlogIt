const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Custom Middleware
function isAuthenticated(req, res, next) {
    const isAuthenticated = req.session.user_id;

    if (!isAuthenticated) return res.redirect("/login");

    next();
}

// Show Homepage
router.get("/", async (req, res) => {
    let posts = await Post.findAll({
        include: User
    });

    posts = posts.map(t => t.get({ plain: true }));

    res.render("index", {
        isHome: true,
        isLoggedIn: req.session.user_id,
        posts
    });
});
