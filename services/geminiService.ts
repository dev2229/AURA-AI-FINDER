import { GoogleGenAI, Type } from "@google/genai";
import { AITool } from "../types.ts";

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
      review_count: { type: Type.STRING, description: "Popularity, e.g., '12k+', '850+'" },
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
  // Fixed: Access process.env.API_KEY directly as required by the Gemini API integration rules.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Discovery Engine Offline: API_KEY missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `List 20 high-quality, actual AI tools relevant to: "${query}". 
      Return verified operational links. Rank by professional utility.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: TOOL_SCHEMA,
        systemInstruction: "You are the Intelligence Director for AI Finder. Provide strictly validated, operational tools. Format as high-precision JSON."
      },
    });

    const results = JSON.parse(response.text || "[]");
    
    return results.map((tool: any, index: number) => ({
      ...tool,
      id: `tool-${index}-${Date.now()}`,
    }));
  } catch (error) {
    console.error("Discovery Engine Error:", error);
    throw error;
  }
}
