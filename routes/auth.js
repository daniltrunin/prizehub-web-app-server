const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const generateToken = require("../middlewares.js")

// Регистрация пользователя
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const token = generateToken();

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const newUser = new User({ username, password, token });

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error registering user" });
    }
});

// Логин пользователя
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const token = generateToken();

    try {
        let user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        user.token = token;
        await user.save()
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Ошибка при логине: ", error);
        res.status(500).json({ error: "Error logging in" });
    }
});

// Лог аут пользователя
router.post("/logout", async (req, res) => {
    const { username, token } = req.body;
    const newToken = generateToken()

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        if (!token || token != user.token) {
            return res.status(401).json({ error: "Клиент не аутентифицирован и требует корректных данных для доступа" })
        }

        user.token = newToken;
        await user.save();

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Ошибка при логауте: ", error);
        res.status(500).json({ error: "Error logging out" });
    }
});

module.exports = router;
