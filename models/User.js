const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notes: { type: Array },
});

module.exports = mongoose.model("User", UserSchema);  
