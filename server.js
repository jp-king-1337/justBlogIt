require("dotenv").config()

const express = require("express");
const { engine } = require("express-handlebars");

// Import session
const session = require("express-session");

// Import db connection
const db = require("./db/connection");

// Import routes
// Not yet, but will need to later

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(express.json()); // Allows client/browser to send json in a request
app.use(express.urlencoded({ extended: true })); // Allows standard encoded form data submissions
app.use(express.static("public")); // Allows client/browser to access folders and files in public -- makes public the root

// Handlebars Template Engine Setup
app.engine("hbs", engine({
    layoutsDir: "./views/layouts", // DRY - use templates
    extname: "hbs" // Handlebars files are now .hbs
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
// app.use("/"); // None yet, I guess that this will crash the server as long as I'm not calling any Middleware. Gonna comment out.

// Connect to db and create tables based off models
db.sync({ force: false })
    .then(() => {
        // Start server
        app.listen(PORT, () => console.log("Server started on port %s", PORT));
    });