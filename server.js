require("dotenv").config()

const express = require("express");
const { engine } = require("express-handlebars");

// Import session
const session = require("express-session");

// Import db connection
const db = require("./db/connection");

// Import routes
const post_routes = require("./controllers/post_routes");
const user_routes = require("./controllers/user_routes");
const view_routes = require("./controllers/view_routes");

const app = express();
const PORT = process.env.PORT || 3636;

// Middleware
app.use(express.json()); // Allows client/browser to send json in a request
app.use(express.urlencoded({ extended: true })); // Allows standard encoded form data submissions
app.use(express.static("public")); // Allows client/browser to access folders and files in public -- makes public the root

// Handlebars Template Engine Setup
app.engine("hbs", engine({
    layoutsDir: "./views/layouts", // DRY - use templates
    extname: "hbs", // Handlebars files are now .hbs
    helpers: {
        formatDate: function (date) {
            return new Date(date).toLocaleDateString();
        }
    },
    // At a loss to my error - ChatGPT suggests these runtimeOptions
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set("view engine", "hbs");
app.set("views", "./views");

// Load Sessions
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true }
}));

// Load Routes
app.use("/", [post_routes, user_routes, view_routes]);

// Connect to db and create tables based off models
db.sync({ force: false })
    .then(() => {
        // Start server
        app.listen(PORT, () => console.log("Server started on port %s", PORT));
    });