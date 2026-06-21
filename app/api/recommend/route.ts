import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  baseURL: "https://apihub.agnes-ai.com/v1",
  apiKey: process.env.AGNES_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await client.chat.completions.create({
      model: "agnes-2.0-flash",
      messages: [
        {
          role: "system",
          content:
            "You are Agnes AI, a friendly fashion stylist for StyleMate. Give practical outfit advice based on the user's profile, wardrobe, weather, and occasion. Keep it concise, specific, and confident.",
        },
        {
          role: "user",
          content: JSON.stringify(body),
        },
      ],
    });

    return NextResponse.json({
      recommendation: completion.choices[0]?.message?.content ?? "No recommendation generated.",
    });
  } catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : "Unknown Agnes AI error",
    },
    { status: 500 }
  );
}
}