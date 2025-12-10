const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(session({
    secret: "mysimplesecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } 
}));

mongoose.connect("mongodb://localhost:27017/simple_authentication")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model("User", UserSchema);

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
        return res.json({ status: "error", message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashed });

    res.json({ status: "ok", message: "Signup successful" });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ status: "error", message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ status: "error", message: "Wrong password" });

    req.session.userId = user._id;

    res.json({ status: "ok", message: "Login successful" });
});

app.get("/check", (req, res) => {
    if (req.session.userId) {
        return res.json({ loggedIn: true });
    }
    res.json({ loggedIn: false });
});


app.get("/logout", (req, res) => {
    req.session.destroy();
    res.json({ status: "ok", message: "Logged out" });
});


app.get("/dashboard", async (req, res) => {
    if (!req.session.userId) {
        return res.json({ status: "error", message: "Not logged in" });
    }

    const user = await User.findById(req.session.userId);

    res.json({ status: "ok", name: user.name, email: user.email });
});

app.listen(5000, () => console.log("Server running on port 5000"));