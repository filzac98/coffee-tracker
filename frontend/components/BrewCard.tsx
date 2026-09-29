import type { Brew } from "@/types/brew";
import Link from "next/link";
import DeleteBrewButton from "./DeleteBrewButton";

type BrewCardProps = {
  brew: Brew;
};

export default function BrewCard({ brew }: BrewCardProps) {
  return (
    <div className="rounded-2xl border border-[#ded5c8] bg-[#fffdf9] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{brew.brewMethod}</p>
          <p className="mt-1 text-sm text-[#806f60]">
            {brew.machine}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/brews/${brew.id}/edit`}
            className="text-sm font-medium text-gray-500 hover:text-black"
          >
            Edit
          </Link>

          <DeleteBrewButton brewId={brew.id} />

          <span className="rounded-full bg-[#eadbc8] px-3 py-1 text-sm font-medium text-[#5c3d26]">
            ★ {brew.rating}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="text-xs text-[#806f60]">Recipe</p>
          <p className="mt-1 font-medium">
            {brew.coffeeDose}g → {brew.yield}g
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Time</p>
          <p className="mt-1 font-medium">{brew.brewTime}s</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Grind</p>
          <p className="mt-1 font-medium">{brew.grindSize}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Temperature</p>
          <p className="mt-1 font-medium">
            {brew.waterTemp ? `${brew.waterTemp}°C` : "—"}
          </p>
        </div>
      </div>

      {brew.notes && (
        <p className="mt-5 border-t border-[#e8dfd3] pt-4 text-sm text-[#695747]">
          {brew.notes}
        </p>
      )}
    </div>
  );
}