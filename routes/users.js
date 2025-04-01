const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

// Поиск пользователя по username
router.post("/:username", async (req, res) => {
    try {
        const { username, token } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        if (!token || token != user.token) {
            return res.status(401).json({ error: "Клиент не аутентифицирован и требует корректных данных для доступа" })
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;