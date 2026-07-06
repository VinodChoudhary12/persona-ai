const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoute = require("./routes/chat");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://persona-ai-client.onrender.com",
    process.env.CLIENT_URL,
].filter(Boolean).map(origin => origin.replace(/\/$/, ""));

app.use(cors({
    origin(origin, callback) {
        const normalizedOrigin = origin?.replace(/\/$/, "");

        if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Persona AI server is running",
    });
});

app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
