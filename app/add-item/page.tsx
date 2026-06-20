"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Camera, Save, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  colour: string;
  image: string;
};

export default function AddItemPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Shirt");
  const [colour, setColour] = useState("");
  const [image, setImage] = useState("");

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function saveItem() {
    if (!name.trim()) {
      alert("Please enter an item name.");
      return;
    }

    const newItem: WardrobeItem = {
      id: Date.now().toString(),
      name,
      category,
      colour,
      image,
    };

    const existingItems = localStorage.getItem("stylemate_wardrobe");
    const wardrobe: WardrobeItem[] = existingItems
      ? JSON.parse(existingItems)
      : [];

    wardrobe.push(newItem);

    localStorage.setItem("stylemate_wardrobe", JSON.stringify(wardrobe));

    router.push("/wardrobe");
  }

  return (
    <main className="min-h-screen bg-[#eadcff] text-[#4b3a5d]">
      <div className="mx-auto min-h-screen max-w-md px-6 pb-32 pt-8">
        <header className="flex items-center gap-4">
          <Link
            href="/wardrobe"
            className="grid h-12 w-12 place-items-center rounded-full bg-white/70 shadow"
          >
            <ArrowLeft size={24} />
          </Link>

          <div>
            <h1 className="text-4xl font-black text-[#463052]">Add Item</h1>
            <p className="mt-2 text-lg font-medium text-[#7d6599]">
              Add a clothing item to your wardrobe
            </p>
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white/70 shadow-xl">
          <label className="grid min-h-[240px] cursor-pointer place-items-center bg-[#cdb7f5] p-8 text-center">
            {image ? (
              <img
                src={image}
                alt="Uploaded clothing item"
                className="h-56 w-full rounded-3xl object-cover shadow-lg"
              />
            ) : (
              <div>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/60 text-[#4b3a5d]">
                  <Camera size={36} />
                </div>
                <h2 className="mt-5 text-xl font-black">Upload Photo</h2>
                <p className="mt-2 text-sm font-semibold text-[#7d6599]">
                  Click here to choose an image
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          <div className="space-y-4 p-6">
            <p className="flex items-center gap-2 text-lg font-black text-[#a47be5]">
              <Sparkles size={20} />
              Item details
            </p>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] px-5 py-4 font-semibold outline-none"
              placeholder="Item name, e.g. White polo shirt"
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] px-5 py-4 font-semibold outline-none"
            >
              <option>Shirt</option>
              <option>T-shirt</option>
              <option>Pants</option>
              <option>Shorts</option>
              <option>Dress</option>
              <option>Outerwear</option>
              <option>Shoes</option>
              <option>Accessory</option>
            </select>

            <input
              value={colour}
              onChange={(event) => setColour(event.target.value)}
              className="w-full rounded-3xl border-2 border-[#d5b9ff] bg-[#eadcff] px-5 py-4 font-semibold outline-none"
              placeholder="Colour, e.g. White"
            />

            <button
              onClick={saveItem}
              className="flex w-full items-center justify-center gap-3 rounded-3xl bg-[#8e63d1] px-6 py-5 text-lg font-black text-white shadow-lg"
            >
              <Save size={24} />
              Save to Wardrobe
            </button>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
