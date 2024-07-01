import express from "express";
import axios from "axios";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const API_URL = "https://riddles-api.vercel.app/random";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const secret ='you are smart';
// Set up session middleware
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to fetch new riddle if session doesn't have one
const fetchNewRiddle = async (req, res, next) => {
    if (!req.session.question) {
        try {
            const response = await axios.get(API_URL);
            req.session.question = response.data.riddle;
            req.session.answer = response.data.answer;
        } catch (error) {
            return res.status(500).send("Error fetching riddle");
        }
    }
    next();
};

app.get("/", fetchNewRiddle, (req, res) => {
    res.render("index", {
        question: req.session.question,
        answer: "",
    });
});

app.get("/check", fetchNewRiddle, (req, res) => {
    res.render("index", {
        question: req.session.question,
        answer: req.session.answer,
    });
});

app.get("/next", (req, res) => {
    // Clear current riddle from session to fetch a new one
    req.session.question = null;
    req.session.answer = null;
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
