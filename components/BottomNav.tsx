"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shirt, Sparkles, Users, User } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Wardrobe", href: "/wardrobe", icon: Shirt },
  { label: "Generate", href: "/generate", icon: Sparkles, center: true },
  { label: "Jams", href: "/jams", icon: Users },
  { label: "Me", href: "/profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 grid w-[92%] max-w-md -translate-x-1/2 grid-cols-5 items-center rounded-full bg-[#4b3a5d] px-4 py-3 text-xs font-semibold text-white/60 shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        if (item.center) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="-mt-8 flex flex-col items-center gap-1 rounded-full bg-[#a47be5] p-4 text-white shadow-lg ring-4 ring-white/30"
            >
              <Icon size={28} />
              {item.label}
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 rounded-full px-3 py-2 ${
              isActive ? "bg-white/10 text-white" : "text-white/60"
            }`}
          >
            <Icon size={22} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
