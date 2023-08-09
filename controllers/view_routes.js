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

    res.render("dashboard", {
        isHome: true,
        isLoggedIn: req.session.user_id,
        posts
    });
});

// Show Register Page
router.get("/register", (req, res) => {
    if (req.session.user_id) return res.redirect("/dashboard");

    res.render("register", {
        isRegister: true
    });
});

// Show Dashboard Page
router.get("/dashboard", isAuthenticated, async (req, res) => {

    const user = await User.findByPk(req.session.user_id, {
        include: Post
    });

    const posts = user.posts.map(t => t.get({ plain: true }));

    // The user IS logged in
    res.render("dashboard", {
        isDashboard: true,
        email: user.email,
        posts
    });
});

module.exports = router;