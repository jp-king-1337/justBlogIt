const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Log in user
router.post("/signin", async (req, res) => {
    try {
        const formUsername = req.body.username;
        const formPassword = req.body.password;

        const user = await User.findOne({
            where: {
                username: formUsername
            }
        });

        if (!user) return res.redirect("/register");

        const isValidPass = await user.validatePass(formPassword)

        if (!isValidPass) throw new Error("invalid_password");

        req.session.user_id = user.id;
        req.session.user_username = user.username;

        res.redirect("/dashboard");

    } catch (err) {
        if (err.message === "invalid_password") {
            res.redirect("/signin");
        }
    }
});

// Register user
router.post("/register", async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.user_id = newUser.id;
        req.session.user_username = newUser.username;

        res.redirect("/dashboard");
    } catch (err) {
        const dupeEmail = err.errors.find(e => e.path === "email");

        if (dupeEmail) res.redirect("/signin");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy();

    res.redirect("/");
})

module.exports = router;