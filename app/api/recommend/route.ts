import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
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
    return NextResponse.json(
      { error: "Agnes AI failed to generate a recommendation." },
      { status: 500 }
    );
  }
}
