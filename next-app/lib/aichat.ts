const chatWithAi = async (message: string) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tngtech/deepseek-r1t2-chimera:free",
          messages: [
            {
              role: "system",
              content: `
                    You are a carbon emission estimation assistant named CarbonSense.
                    Your task is to calculate approximate carbon emissions for user activities.

                    The user will send natural language inputs like:
                    - "I drove 10 km today"
                    - "I used AC for 3 hours"
                    - "I took a flight for 800 km"

                    You must always respond an object 
                    {
                      "chat": "Friendly explanation in one short sentence about their carbon emission",
                      "carbonEmission": number (approximation in kilograms of CO2)
                    }

                    If unsure, make your best reasonable estimate based on common averages (for example, 10 km drive ≈ 2.3 kg CO2). Do not include any text outside the JSON.
            `,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch AI response");
    }

    const data = await response.json();

    const rawResponse = data?.choices?.[0]?.message?.content || "{}";

    return rawResponse;
  } catch (error: any) {
    console.error("Error in chatWithAi:", error.message);
    return {
      chat: "Error occurred while getting AI response.",
      carbonEmission: 0,
    };
  }
};

export default chatWithAi;
