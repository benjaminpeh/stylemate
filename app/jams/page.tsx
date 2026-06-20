import { PartyPopper, Users } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function JamsPage() {
  return (
    <main className="min-h-screen bg-[#eadcff] text-[#4b3a5d]">
      <div className="mx-auto min-h-screen max-w-md px-6 pb-32 pt-8">
        <header>
          <h1 className="text-4xl font-black text-[#463052]">Style Jams</h1>
          <p className="mt-2 text-lg font-medium text-[#7d6599]">
            Coordinate looks with your crew
          </p>
        </header>

        <section className="mt-8 grid grid-cols-3 rounded-full bg-white/75 p-2 shadow">
          <button className="rounded-full bg-[#4b3a5d] px-4 py-3 font-bold text-white">
            My Jams
          </button>
          <button className="px-4 py-3 font-bold text-[#7d6599]">Create</button>
          <button className="px-4 py-3 font-bold text-[#7d6599]">Join</button>
        </section>

        <section className="grid min-h-[520px] place-items-center text-center">
          <div>
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#c9aaf5] text-[#563a73]">
              <PartyPopper size={38} />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-[#4b3a5d]">
              No active jams yet
            </h2>
            <p className="mt-3 text-lg text-[#7d6599]">
              Create a jam or join one with a code
            </p>

            <button className="mt-7 rounded-full bg-[#a47be5] px-8 py-4 text-lg font-black text-white shadow-lg">
              Create a Jam
            </button>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
