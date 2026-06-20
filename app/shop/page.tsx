"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Sparkles, Star, CheckCircle2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";

type Product = {
  id: string;
  name: string;
  type: string;
  price: string;
  colour: string;
};

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

const products: Product[] = [
  {
    id: "shop-1",
    name: "Dry Pique Polo Shirt",
    type: "Shirt",
    price: "29.90",
    colour: "White",
  },
  {
    id: "shop-2",
    name: "Broadcloth Shirt Long Sleeve",
    type: "Long Sleeve",
    price: "39.90",
    colour: "Light Blue",
  },
  {
    id: "shop-3",
    name: "Petrol Blue Relaxed Crew Neck",
    type: "Shirt",
    price: "14.99",
    colour: "Blue",
  },
  {
    id: "shop-4",
    name: "Black Domain Short Sleeve Shirt",
    type: "Shirt",
    price: "19.99",
    colour: "Black",
  },
  {
    id: "shop-5",
    name: "Black Clarke Overshirt",
    type: "Outerwear",
    price: "59.99",
    colour: "Black",
  },
];

export default function ShopPage() {
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [profile, setProfile] = useState<StyleProfile>({
    name: "there",
    style: "Minimalist",
    undertone: "Warm",
    budget: "200",
  });

  useEffect(() => {
    const savedItems = localStorage.getItem("stylemate_wardrobe");
    const savedProfile = localStorage.getItem("stylemate_profile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedItems) {
      const wardrobe: WardrobeItem[] = JSON.parse(savedItems);
      const ids = wardrobe
        .filter((item) => item.id.startsWith("shop-"))
        .map((item) => item.id);

      setAddedIds(ids);
    }
  }, []);

  function addToWardrobe(product: Product) {
    const existingItems = localStorage.getItem("stylemate_wardrobe");
    const wardrobe: WardrobeItem[] = existingItems
      ? JSON.parse(existingItems)
      : [];

    const alreadyAdded = wardrobe.some((item) => item.id === product.id);

    if (alreadyAdded) {
      return;
    }

    const newItem: WardrobeItem = {
      id: product.id,
      name: product.name,
      category: product.type,
      colour: product.colour,
      image: "",
    };

    const updatedWardrobe = [...wardrobe, newItem];

    localStorage.setItem("stylemate_wardrobe", JSON.stringify(updatedWardrobe));
    setAddedIds((current) => [...current, product.id]);
  }

  const filteredProducts = products.filter((product) => {
    const budgetNumber = Number(profile.budget) || 999;
    return Number(product.price) <= budgetNumber;
  });

  return (
    <main className="min-h-screen bg-[#eadcff] text-[#4b3a5d]">
      <div className="mx-auto min-h-screen max-w-md px-6 pb-32 pt-8">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-black text-[#463052]">Discover</h1>
            <p className="mt-2 text-lg font-medium text-[#7d6599]">
              Curated for your colour and style
            </p>
          </div>

          <div className="grid h-14 w-14 place-items-center rounded-full bg-white/70 shadow">
            <ShoppingCart size={26} />
          </div>
        </header>

        <section className="mt-7 rounded-[2rem] bg-white/75 p-5 shadow-xl">
          <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#a47be5]">
            <Sparkles size={18} />
            AI Style Filter
          </p>

          <div className="mt-4 rounded-3xl bg-[#eadcff] p-4 text-base font-medium leading-7 text-[#5a4670]">
            Hi {profile.name || "there"}. I curated these picks based on your{" "}
            {profile.style} style, {profile.undertone} undertone, and $
            {profile.budget} budget.
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto">
            <button className="whitespace-nowrap rounded-full bg-[#c9aaf5] px-4 py-3 font-bold">
              Under ${profile.budget}
            </button>
            <button className="whitespace-nowrap rounded-full bg-[#c9aaf5] px-4 py-3 font-bold">
              {profile.undertone} tones
            </button>
            <button className="whitespace-nowrap rounded-full bg-[#c9aaf5] px-4 py-3 font-bold">
              {profile.style}
            </button>
          </div>
        </section>

        <section className="mt-7 space-y-4">
          {filteredProducts.map((product) => {
            const isAdded = addedIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-3xl bg-[#eadcff] p-4 shadow"
              >
                <div>
                  <h3 className="text-lg font-black text-[#463052]">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#7d6599]">
                    {product.type} - {product.colour}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#7d6599]">
                    <Star size={15} className="fill-yellow-400 text-yellow-400" />
                    4.5
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-[#463052]">
                    ${product.price}
                  </p>

                  <button
                    onClick={() => addToWardrobe(product)}
                    disabled={isAdded}
                    className={`mt-3 rounded-full px-5 py-2 font-bold text-white ${
                      isAdded ? "bg-[#8e63d1]" : "bg-[#4b3a5d]"
                    }`}
                  >
                    {isAdded ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={16} />
                        Added
                      </span>
                    ) : (
                      "+ Add"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
