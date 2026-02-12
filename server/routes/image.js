import express from 'express';
import { GoogleGenAI } from "@google/genai";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { upload } from '../Middleware/multer.js';
import cloudinary from '../Middleware/cloudnairy.js';
import client from '../config.js';


dotenv.config();

const router = express.Router();
const database = client.db("Hackathon");
const bills = database.collection('bills');

// Initialize Google Gen AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/billImage', upload.single('billImage'), async (req, res) => {
    try {
        // Verify JWT
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ status: 0, error: "Unauthorized" });
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);

        // Check file
        if (!req.file) return res.status(400).json({ status: 0, error: "No file uploaded" });

        // Upload to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(req.file.path, { folder: 'products' });
        const imageURL = imageUpload.secure_url;

        // Save to MongoDB
        const bill = {
            user: decoded._id,
            billImage: imageURL,
            createdAt: Date.now()
        };
        await bills.insertOne(bill);

        // Call Gemini AI for explanation
        const aiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Explain this electricity/gas bill from this image URL in simple words for a normal user:
${imageURL}
Mention why the bill might be high or low and give one tip to reduce it.`,
            temperature: 0.7
        });

        // Gemini response text
        const aiResult = aiResponse.text.trim();

        // Send back to frontend
        res.json({
            status: 1,
            message: "Image uploaded and explained successfully",
            billImage: imageURL,
            aiResult
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 0, error: "Something went wrong", details: err.message });
    }
});

export default router;
