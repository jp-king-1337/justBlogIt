// const express = require("express");
// const router = express.Router();
// const Post = require("../models/Post");

// // Route to send posts to dashboard
// router.get("/dashboard", isAuthenticated, async (req, res) => {
//     try {
//         const user = await User.findByPk(req.session.user_id, {
//             include: Post
//         });

//         const posts = user.posts.map(t => t.get({ plain: true }));

//         res.render("dashboard", {
//             isDashboard: true,
//             isLoggedIn: true,
//             email: user.email,
//             posts
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Failed to retrieve posts.");
//     }
// });

// module.exports = router;