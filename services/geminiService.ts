import { GoogleGenAI } from "@google/genai";

// In a real app, manage this securely. 
// We allow passing a key dynamically for the "User Provided Key" feature.
let client: GoogleGenAI | null = null;

const getClient = (customKey?: string) => {
  const key = customKey || import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!client || customKey) {
    client = new GoogleGenAI({ apiKey: key });
  }
  return client;
};

interface ChatOptions {
  image?: string; // Base64
  context?: string;
  useMaps?: boolean;
  userApiKey?: string;
}

export const generateBotResponse = async (userMessage: string, options: ChatOptions = {}): Promise<string> => {
  try {
    const ai = getClient(options.userApiKey);
    
    // 1. Image Analysis Task -> Use gemini-3-pro-preview
    if (options.image) {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: options.image.split(',')[1] } }, // Strip header
            { text: userMessage || "Analyze this image for construction safety or architectural details." }
          ]
        },
        config: {
          systemInstruction: "You are an expert construction analyst for Archon Strategic Works. Analyze site images for safety violations, progress, or material identification.",
        }
      });
      return response.text || "Analysis complete.";
    }

    // 2. Location/Maps Task -> Use gemini-2.5-flash with Google Maps Tool
    if (options.useMaps) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          tools: [{ googleMaps: {} }],
          systemInstruction: "You are a logistics coordinator. Provide accurate location data for infrastructure projects.",
        }
      });
      
      // Handle grounding if present, otherwise text
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      let text = response.text || "";
      if (chunks) {
        text += "\n\n[References Found via Google Maps]";
      }
      return text;
    }

    // 3. General Chat / Knowledge Base -> Use gemini-3-flash-preview
    const systemInstruction = `
      You are the AI assistant for Archon Strategic Works (ASW).
      Tone: Professional, disciplined, futuristic, defense-grade.
      Languages: English, Bengali.
      
      KNOWLEDGE BASE CONTEXT:
      ${options.context || "Standard SOPs apply."}
      
      Company Info:
      - Slogan: Infrastructure Built On Integrity
      - Office: Mirpur DOHS, Dhaka.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Secure connection interrupted.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System offline or API Key invalid. Please check HQ connection.";
  }
};