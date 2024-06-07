import axios from "axios";

export const sendPromptToChatGPT = async (prompt: string): Promise<string> => {
  const instructions = `Do not include any explanations. Write a detailed character description with 215 characters limit based on product description and combine it with best user reviews. Return a RFC8259 compliant JSON response following this format without deviation:
    {
      
      "title": "Product Title",
      "description: "Deatiled Product Description",
    }
    `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${instructions}: ${prompt}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAT_GPT_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending prompt to ChatGPT:", error);
    throw error;
  }
};
