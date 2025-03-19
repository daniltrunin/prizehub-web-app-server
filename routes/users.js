const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

// Поиск пользователя по username
router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;