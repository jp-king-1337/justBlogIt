const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Custom Middleware
function isAuthenticated(req, res, next) {
    const isAuthenticated = req.session.user_id;

    if (!isAuthenticated) return res.redirect("/signin");

    next();
}

// Show Homepage
router.get("/", async (req, res) => {
    try {
        let posts = await Post.findAll({
            include: User
        });

        posts = posts.map(t => t.get({ plain: true }));

        res.render("home", {
            isHome: true,
            isLoggedIn: req.session.user_id,
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve posts.");
    }
});


// Show Register Page
router.get("/register", (req, res) => {
    if (req.session.user_id) return res.redirect("/");

    res.render("register", {
        isAuth: true,
        isLoggedIn: false
    });
});

// Show Signin Page
router.get("/signin", (req, res) => {
    if (req.session.user_id) return res.redirect("/");

    res.render("signin", {
        isAuth: true,
        isLoggedIn: false
    });
});

// Show Dashboard Page
router.get("/dashboard", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, {
            include: Post
        });

        const posts = user.posts.map(t => t.get({ plain: true }));

        res.render("dashboard", {
            isDashboard: true,
            isLoggedIn: true,
            username: user.username,
            email: user.email,
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve posts.");
    }
});

module.exports = router;