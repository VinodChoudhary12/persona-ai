const express = require("express");
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const hitesh = require("../personas/hitesh");
const piyush = require("../personas/piyush");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

router.post("/", async (req, res) => {

    try {

        const { persona, message } = req.body;

        const systemPrompt =
            persona === "piyush"
                ? piyush
                : hitesh;

        const prompt = `

${systemPrompt}

User Question:

${message}

Answer exactly in this persona.

`;

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        res.json({
            success: true,
            answer: response
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;