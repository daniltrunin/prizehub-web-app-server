const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT ?? 5000;
const app = express();
const authRoutes = require("./routes/auth");
require("dotenv").config();

app.use(
    cors({
        origin: "http://localhost:5000", // Разрешить запросы только с этого домена
        methods: ["GET", "POST"], // Разрешенные HTTP-методы
        allowedHeaders: ["Content-Type", "Authorization"], // Разрешенные заголовки
    })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to mongodb"))
    .catch((e) => console.error(`Error connecting: ${e}`))
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(PORT, () => {
    console.log("server is running...")
})

// Роуты для авторизации
app.use("/auth", authRoutes); 