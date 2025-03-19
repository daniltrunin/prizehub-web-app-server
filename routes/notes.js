const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

// Добавить заметку
router.put("/add", async (req, res) => {
    try {
        const { username, note } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        user.notes.push(note);
        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;