"use client";

import { CloudSun, Sparkles, Shirt, Users, ShoppingBag } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#eadcff] text-[#4b3a5d]">
      <div className="mx-auto min-h-screen max-w-md px-6 pb-32 pt-8">
        <header className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b72ad]">
              Tuesday, 16 June
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-[#463052]">
              What are you
              <span className="block text-[#a47be5]">wearing today?</span>
            </h1>
          </div>

          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#a47be5] text-xl font-bold text-white shadow-lg">
            J
          </div>
        </header>

        <section className="mt-7 rounded-[2rem] bg-gradient-to-br from-[#a9c8ff] to-[#b9a4f4] p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white/25">
              <CloudSun size={34} />
            </div>

            <div>
              <h2 className="text-3xl font-black">Estimated: 26 C</h2>
              <p className="mt-1 text-sm font-semibold text-white/90">
                Partly cloudy with low chance of rain - Singapore
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white/20 p-4 text-sm font-semibold leading-6 backdrop-blur">
            Lightweight cotton shirt and breathable trousers or shorts. Carry a
            light umbrella just in case.
          </div>
        </section>

        <section className="mt-7 overflow-hidden rounded-[2rem] bg-white/70 shadow-xl backdrop-blur">
          <div className="border-b border-purple-100 px-6 py-4">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#a47be5]">
              <Sparkles size={18} />
              AI Outfit Generator
            </p>
          </div>

          <div className="space-y-4 p-5">
            <textarea
              className="h-32 w-full resize-none rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] p-5 text-base font-medium text-[#5a4670] outline-none placeholder:text-[#9a86b2]"
              placeholder="It is estimated 26 C in Singapore. Describe your vibe or occasion..."
            />

            <button className="flex w-full items-center justify-between rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] p-5 text-left">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#c9aaf5] text-[#563a73]">
                  <Shirt size={24} />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-[#4b3a5d]">
                    Must-wear pieces
                  </p>
                  <p className="text-sm font-medium text-[#7d6599]">
                    Tap to pick items you want styled today
                  </p>
                </div>
              </div>
              <span className="text-2xl text-[#7d6599]">›</span>
            </button>

            <a
              href="/generate"
              className="flex w-full items-center justify-center gap-3 rounded-3xl bg-[#8e63d1] px-6 py-5 text-lg font-black text-white shadow-lg"
            >
              <Sparkles size={24} />
              Generate Outfit
            </a>
          </div>
        </section>

        <section className="mt-7 space-y-4">
          <a
            href="/jams"
            className="flex items-center justify-between rounded-[2rem] bg-[#8e63d1] p-5 text-white shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20">
                <Users size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black">Style Jams</h3>
                <p className="text-sm font-semibold text-white/80">
                  Coordinate outfits with friends
                </p>
              </div>
            </div>
            <span className="rounded-full bg-white/20 px-5 py-3 font-bold">
              Join
            </span>
          </a>

          <a
            href="/shop"
            className="flex items-center justify-between rounded-[2rem] bg-white/75 p-5 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#c9aaf5]">
                <ShoppingBag size={27} />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#463052]">
                  Discover and Shop
                </h3>
                <p className="text-sm font-semibold text-[#7d6599]">
                  Mindful gap-fills within your budget
                </p>
              </div>
            </div>
            <span className="text-2xl text-[#7d6599]">›</span>
          </a>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
