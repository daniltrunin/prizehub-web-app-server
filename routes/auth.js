const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

// Регистрация пользователя
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const newUser = new User({ username, password });
        /* */
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        /* */
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error registering user" });
    }
});

// Логин пользователя
// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username });
//         if (!user || user.password !== password) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }
//         res.status(200).json({ message: "Login successful" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error logging in" });
//     }
// });

module.exports = router;
