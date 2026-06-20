"use client";

import { useEffect, useState } from "react";
import { User, Settings, Shirt, Sparkles, Save } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type StyleProfile = {
  name: string;
  style: string;
  undertone: string;
  budget: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<StyleProfile>({
    name: "James Peh",
    style: "Minimalist",
    undertone: "Warm",
    budget: "200",
  });

  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("stylemate_profile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  function updateProfile(field: keyof StyleProfile, value: string) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function saveProfile() {
    localStorage.setItem("stylemate_profile", JSON.stringify(profile));
    setSavedMessage("Profile saved.");

    setTimeout(() => {
      setSavedMessage("");
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-[#eadcff] text-[#4b3a5d]">
      <div className="mx-auto min-h-screen max-w-md px-6 pb-32 pt-8">
        <header className="text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#a47be5] text-4xl font-black text-white shadow-xl">
            {profile.name.charAt(0).toUpperCase() || "J"}
          </div>
          <h1 className="mt-5 text-4xl font-black text-[#463052]">
            {profile.name || "Your Profile"}
          </h1>
          <p className="mt-2 text-lg font-medium text-[#7d6599]">
            {profile.style}, {profile.undertone} undertone
          </p>
        </header>

        <section className="mt-8 rounded-[2rem] bg-white/75 p-5 shadow-xl">
          <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#a47be5]">
            <Sparkles size={18} />
            Style Profile
          </p>

          <div className="mt-5 space-y-4">
            <input
              value={profile.name}
              onChange={(event) => updateProfile("name", event.target.value)}
              className="w-full rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] px-5 py-4 font-semibold outline-none"
              placeholder="Your name"
            />

            <select
              value={profile.style}
              onChange={(event) => updateProfile("style", event.target.value)}
              className="w-full rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] px-5 py-4 font-semibold outline-none"
            >
              <option>Minimalist</option>
              <option>Streetwear</option>
              <option>Smart Casual</option>
              <option>Preppy</option>
              <option>Sporty</option>
              <option>Elegant</option>
            </select>

            <select
              value={profile.undertone}
              onChange={(event) => updateProfile("undertone", event.target.value)}
              className="w-full rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] px-5 py-4 font-semibold outline-none"
            >
              <option>Warm</option>
              <option>Cool</option>
              <option>Neutral</option>
            </select>

            <input
              value={profile.budget}
              onChange={(event) => updateProfile("budget", event.target.value)}
              className="w-full rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] px-5 py-4 font-semibold outline-none"
              placeholder="Monthly style budget"
            />

            <button
              onClick={saveProfile}
              className="flex w-full items-center justify-center gap-3 rounded-3xl bg-[#8e63d1] px-6 py-5 text-lg font-black text-white shadow-lg"
            >
              <Save size={24} />
              Save Profile
            </button>

            {savedMessage && (
              <p className="text-center font-black text-[#8e63d1]">
                {savedMessage}
              </p>
            )}
          </div>
        </section>

        <section className="mt-7 space-y-4">
          <div className="flex items-center gap-4 rounded-3xl bg-white/75 p-5 shadow">
            <User size={26} />
            <div>
              <h3 className="font-black">Personal style</h3>
              <p className="text-sm font-semibold text-[#7d6599]">
                {profile.style}, {profile.undertone} undertone
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-white/75 p-5 shadow">
            <Shirt size={26} />
            <div>
              <h3 className="font-black">Wardrobe stats</h3>
              <p className="text-sm font-semibold text-[#7d6599]">
                Saved locally in this browser
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-white/75 p-5 shadow">
            <Settings size={26} />
            <div>
              <h3 className="font-black">Budget</h3>
              <p className="text-sm font-semibold text-[#7d6599]">
                ${profile.budget} max recommended spend
              </p>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
