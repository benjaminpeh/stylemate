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
            "You are Agnes AI, the personal stylist for StyleMate.

Use ONLY items from the user's wardrobe when making recommendations.

If the user specifies a must-wear item, always include it.

Return your response in exactly this format:

TOP:
...

BOTTOM:
...

SHOES:
...

ACCESSORIES:
...

WHY:
...

Keep WHY under 2 sentences.
Be concise and practical.
Do not write long paragraphs.",
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