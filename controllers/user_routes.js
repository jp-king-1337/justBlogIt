const router = require("express").Router();
const User = require("../models/User");


// Log in user
router.post("/signin", async (req, res) => {
    try {
        const formEmail = req.body.email;
        const formPassword = req.body.password;

        const user = await User.findOne({
            where: {
                email: formEmail
            }
        });

        if (!user) return res.redirect("/register");

        const isValidPass = await user.validatePass(formPassword)

        if (!isValidPass) throw new Error("invalid_password");

        req.session.user_id = user.id;

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