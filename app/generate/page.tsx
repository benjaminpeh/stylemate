"use client";

import { useEffect, useState } from "react";
import { Sparkles, Shirt, CloudSun, CheckCircle2, Loader2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  colour: string;
  image: string;
};

type StyleProfile = {
  name: string;
  style: string;
  undertone: string;
  budget: string;
};

export default function GeneratePage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [occasion, setOccasion] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<StyleProfile>({
    name: "there",
    style: "Minimalist",
    undertone: "Warm",
    budget: "200",
  });

  useEffect(() => {
    const savedItems = localStorage.getItem("stylemate_wardrobe");
    const savedProfile = localStorage.getItem("stylemate_profile");

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  function buildItemName(item: WardrobeItem) {
    const name = item.name.trim();
    const colour = item.colour.trim();

    if (!colour) return name;

    if (name.toLowerCase().includes(colour.toLowerCase())) {
      return name;
    }

    return `${colour} ${name}`;
  }

  async function generateOutfit() {
  if (items.length === 0) {
    setResult("Add at least one wardrobe item first so Agnes AI can generate an outfit.");
    return;
  }

  setIsLoading(true);
  setResult("");

  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        occasion: occasion || "a casual day out",
        profile,
        wardrobe: items,
        weather: {
          temperature: "26 C",
          location: "Singapore",
          condition: "light outfit recommended",
        },
      }),
    });

    const data = await response.json();

    setResult(data.recommendation || "Agnes AI could not generate a recommendation.");
  } catch (error) {
    setResult("Agnes AI failed to generate a recommendation. Please try again.");
  } finally {
    setIsLoading(false);
  }
}
  return (
    <main className="min-h-screen bg-[#eadcff] text-[#4b3a5d]">
      <div className="mx-auto min-h-screen max-w-md px-6 pb-32 pt-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b72ad]">
            AI Styling
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-[#463052]">
            Generate
            <span className="block text-[#a47be5]">your outfit</span>
          </h1>
          <p className="mt-3 text-base font-semibold text-[#7d6599]">
            Using {profile.style} style, {profile.undertone} undertone
          </p>
        </header>

        <section className="mt-7 rounded-[2rem] bg-gradient-to-br from-[#a9c8ff] to-[#b9a4f4] p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white/25">
              <CloudSun size={34} />
            </div>
            <div>
              <h2 className="text-3xl font-black">26 C</h2>
              <p className="mt-1 text-sm font-semibold text-white/90">
                Singapore - light outfit recommended
              </p>
            </div>
          </div>
        </section>

        <section className="mt-7 overflow-hidden rounded-[2rem] bg-white/75 shadow-xl">
          <div className="border-b border-purple-100 px-6 py-4">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#a47be5]">
              <Sparkles size={18} />
              Outfit brief
            </p>
          </div>

          <div className="space-y-4 p-5">
            <textarea
              value={occasion}
              onChange={(event) => setOccasion(event.target.value)}
              className="h-32 w-full resize-none rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] p-5 text-base font-medium text-[#5a4670] outline-none placeholder:text-[#9a86b2]"
              placeholder="Describe your occasion, vibe, or must-wear item..."
            />

            <button
              onClick={generateOutfit}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-3xl bg-[#8e63d1] px-6 py-5 text-lg font-black text-white shadow-lg disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Styling your outfit...
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  Generate Outfit
                </>
              )}
            </button>
          </div>
        </section>

        <section className="mt-7 rounded-[2rem] bg-white/75 p-5 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#c9aaf5]">
              <Shirt size={28} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#463052]">
                Suggested outfit
              </h2>
              <p className="text-sm font-semibold text-[#7d6599]">
                Based on wardrobe, weather, and profile.
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-4">
              {items.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-3xl bg-[#eadcff]"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-40 place-items-center bg-[#c9aaf5]">
                      <Shirt size={40} />
                    </div>
                  )}

                  <div className="p-3">
                    <p className="font-black text-[#463052]">{item.name}</p>
                    <p className="text-sm font-semibold text-[#7d6599]">
                      {item.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-3xl bg-[#eadcff] p-5">
            {isLoading ? (
              <div className="flex items-center gap-3 text-[#8e63d1]">
                <Loader2 className="animate-spin" />
                <p className="font-black">Checking wardrobe and style profile...</p>
              </div>
            ) : result ? (
              <p className="text-base font-semibold leading-7 text-[#4b3a5d]">
                {result}
              </p>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#8e63d1]" />
                  <p className="font-semibold">Add wardrobe items</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#8e63d1]" />
                  <p className="font-semibold">Set your style profile</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#8e63d1]" />
                  <p className="font-semibold">Generate a personalised outfit</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
