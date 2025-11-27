import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS, CATEGORIES } from "../data";

// Helper to format menu for AI context
const formatMenuForAI = () => {
  const items = MENU_ITEMS.map(item => 
    `- ${item.nameFr} (${item.nameAr}): ${item.price} MRU [Category: ${item.category}]`
  ).join('\n');
  return items;
};

export const askAIWaiter = async (userQuery: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "I'm sorry, I cannot connect to the server right now (API Key missing).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const menuContext = formatMenuForAI();
    const systemPrompt = `
      You are a helpful, polite, and appetizing waiter at a restaurant called "Le Gourmet".
      
      Here is the current menu:
      ${menuContext}
      
      Answer the customer's question based ONLY on this menu. 
      - If they ask for recommendations, suggest popular items or combos.
      - Prices are in MRU (Mauritanian Ouguiya).
      - Be concise and friendly.
      - You can speak French or Arabic depending on the user's language, default to French if unsure.
      - Do not invent items not on the menu.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "Je n'ai pas bien compris, pouvez-vous répéter ?";
  } catch (error) {
    console.error("AI Error:", error);
    return "Désolé, je rencontre un problème technique momentané.";
  }
};
