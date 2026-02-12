
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import client from "../config.js";

dotenv.config();

const router = express.Router();
const database = client.db("Hackathon");
const manual = database.collection("manualBills");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

router.post("/manual-bill", async (req, res) => {
    try {
        const { units, baseCost, tax, extra, total } = req.body;

        // 1️⃣ Save in MongoDB
        const bill = { units, baseCost, tax, extra, total, createdAt: new Date() };
        await manual.insertOne(bill);

        // 2️⃣ AI Prompt
        const prompt = `
You are an electricity bill assistant.

Explain this bill in very simple language, step by step, for a normal person:

Units: ${units}
Base Cost: ${baseCost} PKR
Tax: ${tax} PKR
Extra Charges: ${extra} PKR
Total Bill: ${total} PKR

Explain:
1) What each charge means
2) Why total is this amount
3) ONE tip to reduce bill
`;

        // 3️⃣ AI Call
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            temperature: 0.6,
        });

        let explanation = "No explanation returned";
        if (
            response?.candidates &&
            response.candidates.length > 0 &&
            response.candidates[0].content?.parts &&
            response.candidates[0].content.parts.length > 0 &&
            response.candidates[0].content.parts[0].text
        ) {
            explanation = response.candidates[0].content.parts[0].text;
        }
        console.log("FULL GEMINI RESPONSE:", JSON.stringify(response, null, 2));


        res.json({ status: 1, explanation });
    } catch (error) {
        console.error("MANUAL BILL ERROR:", error);
        res.status(500).json({ status: 0, message: "Server error" });
    }
});

export default router;
