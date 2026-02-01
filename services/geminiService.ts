
import { GoogleGenAI, Type } from "@google/genai";
import { AITool, PricingModel } from "../types.ts";

// Safety check for API Key
const API_KEY = process.env.API_KEY;

const TOOL_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      description: { type: Type.STRING },
      pricing_model: { 
        type: Type.STRING, 
        description: "Must be one of: Free, Freemium, Paid"
      },
      rating: { type: Type.NUMBER },
      review_count: { type: Type.STRING, description: "A string representing popularity, e.g., '12k+', '850+', '2k+'" },
      url: { type: Type.STRING },
      category: { type: Type.STRING },
      tags: { 
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
    required: ["name", "description", "pricing_model", "rating", "review_count", "url", "category"],
  },
};

export async function findToolsForTask(query: string): Promise<AITool[]> {
  if (!API_KEY || API_KEY === "undefined") {
    throw new Error("API_KEY_MISSING: Please set your Gemini API Key in the environment variables (Netlify/System).");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Identify exactly 20 of the most reputable and reliable AI tools relevant to: "${query}". 
      Requirements:
      1. Use only currently operational, real-world tools.
      2. Provide realistic user ratings (1.0 to 5.0).
      3. Provide a realistic review count estimate (e.g. 10k+, 500+).
      4. Ensure a mix of pricing models if possible.
      5. Rank them by quality and utility for the specific task.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: TOOL_SCHEMA,
        systemInstruction: "You are the lead intelligence analyst for Aura AI. You must provide a high-quality list of 20 existing AI tools. You must never hallucinate tool names or URLs. Ensure the rating and review counts reflect general industry consensus."
      },
    });

    const results = JSON.parse(response.text);
    
    return results.map((tool: any, index: number) => ({
      ...tool,
      id: `tool-${index}-${Date.now()}`,
    }));
  } catch (error) {
    console.error("Error finding tools:", error);
    throw error;
  }
}
