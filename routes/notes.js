const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

// Получить список заметок при рендере профиля пользователя
router.post("/get", async (req, res) => {
    try {
        const { username, token } = req.body;
        if (!username) {
            return res.status(400).json({ error: "Не указан username" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        if (!token || token != user.token) {
            return res.status(401).json({ error: "Клиент не аутентифицирован и требует корректных данных для доступа", notes: null });
        }

        res.json({ notes: user.notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});


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

// Удалить заметку
router.delete("/delete", async (req, res) => {
    try {
        const { username, note } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" })
        }

        user.notes = user.notes.filter((n) => n !== note)
        await user.save()

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка сервера" })
    }
})

module.exports = router;