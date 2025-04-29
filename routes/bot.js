const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/addtoken", async (req, res) => {
    const { username, token } = req.body;
    if (!username || !token) {
        res.status(400).json({ error: "username and token are required" })
    }

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.botToken = token
        await user.save();
        res.status(200).json({ message: "Adding of bot token succesful" })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error adding bot token" })
    }
})

module.exports = router;