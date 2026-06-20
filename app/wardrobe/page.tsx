"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Shirt, Trash2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  colour: string;
  image: string;
};

export default function WardrobePage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadWardrobe();
  }, []);

  function loadWardrobe() {
    const savedItems = localStorage.getItem("stylemate_wardrobe");

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems([]);
    }
  }

  function removeItem(id: string) {
    const updatedItems = items.filter((item) => item.id !== id);

    localStorage.setItem("stylemate_wardrobe", JSON.stringify(updatedItems));
    setItems(updatedItems);
  }

  function clearWardrobe() {
    const confirmed = confirm("Clear all wardrobe items?");

    if (!confirmed) return;

    localStorage.removeItem("stylemate_wardrobe");
    setItems([]);
    setSearchQuery("");
  }

  const filteredItems = items.filter((item) => {
    const searchText = searchQuery.toLowerCase();

    return (
      item.name.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText) ||
      item.colour.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-[#eadcff] text-[#4b3a5d]">
      <div className="mx-auto min-h-screen max-w-md px-6 pb-32 pt-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-[#463052]">My Wardrobe</h1>
            <p className="mt-2 text-lg font-medium text-[#7d6599]">
              {items.length} items - search and manage your closet
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWardrobe}
              className="rounded-full bg-white/70 px-4 py-2 text-sm font-black text-[#8e63d1] shadow"
            >
              Clear
            </button>
          )}
        </header>

        <section className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-3xl bg-white/70 p-5 text-center shadow">
            <p className="text-2xl font-black text-[#a47be5]">
              {items.length}
            </p>
            <p className="text-sm font-medium text-[#7d6599]">Items</p>
          </div>

          <div className="rounded-3xl bg-white/70 p-5 text-center shadow">
            <p className="text-2xl font-black text-[#a47be5]">0</p>
            <p className="text-sm font-medium text-[#7d6599]">Times worn</p>
          </div>

          <div className="rounded-3xl bg-white/70 p-5 text-center shadow">
            <p className="text-2xl font-black text-[#a47be5]">-</p>
            <p className="text-sm font-medium text-[#7d6599]">Cost/wear</p>
          </div>
        </section>

        <div className="mt-6 flex items-center gap-3 rounded-3xl bg-white/70 px-5 py-4 shadow">
          <Search size={22} className="text-[#7d6599]" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full bg-transparent text-base outline-none placeholder:text-[#9a86b2]"
            placeholder="Search your wardrobe..."
          />
        </div>

        {items.length === 0 ? (
          <section className="grid min-h-[420px] place-items-center text-center">
            <div>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#c9aaf5] text-[#563a73]">
                <Shirt size={34} />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-[#4b3a5d]">
                Your wardrobe is empty
              </h2>
              <p className="mt-3 text-lg text-[#7d6599]">
                Tap + to add your first item
              </p>
            </div>
          </section>
        ) : filteredItems.length === 0 ? (
          <section className="grid min-h-[420px] place-items-center text-center">
            <div>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#c9aaf5] text-[#563a73]">
                <Search size={34} />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-[#4b3a5d]">
                No matching items
              </h2>
              <p className="mt-3 text-lg text-[#7d6599]">
                Try searching by name, colour, or category
              </p>
            </div>
          </section>
        ) : (
          <section className="mt-7 grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-[2rem] bg-white/75 shadow-lg"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="grid h-44 place-items-center bg-[#c9aaf5]">
                    <Shirt size={44} />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-black text-[#463052]">{item.name}</h3>
                  <p className="text-sm font-semibold text-[#7d6599]">
                    {item.category}
                  </p>
                  <p className="text-sm font-semibold text-[#a47be5]">
                    {item.colour || "No colour tagged"}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#eadcff] px-4 py-3 text-sm font-black text-[#8e63d1]"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        <Link
          href="/add-item"
          className="fixed bottom-28 right-8 grid h-20 w-20 place-items-center rounded-full bg-[#a47be5] text-white shadow-2xl"
        >
          <Plus size={36} />
        </Link>
      </div>

      <BottomNav />
    </main>
  );
}
