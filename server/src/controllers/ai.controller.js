import { GoogleGenerativeAI } from "@google/generative-ai";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Initialize the Google Generative AI with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const aiController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    throw new ApiError(400, "Prompt is required");
  }

  try {
    // Select the model
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash-lite", // Or "gemini-1.5-pro"
        systemInstruction: "You are StoryBot, a helpful AI that writes creative stories.",
    });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    if (!aiText) {
        throw new ApiError(500, "AI returned an empty response");
    }

    return res.status(200).json(
      new ApiResponse(
        200, 
        { reply: aiText }, 
        "AI response generated successfully"
      )
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new ApiError(500, "AI generation failed: " + error.message);
  }
});