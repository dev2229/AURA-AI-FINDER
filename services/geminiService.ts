import { GoogleGenAI, Type } from "@google/genai";
import { AITool } from "../types";

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
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : null;
  
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `List 20 actual, operational AI tools that help with: "${query}". 
      Ensure links are real. Focus on high-utility tools only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: TOOL_SCHEMA,
        systemInstruction: "You are the lead intelligence analyst for AI Finder. Only provide real, verified tools. Rank them by quality and utility for the user's specific query."
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