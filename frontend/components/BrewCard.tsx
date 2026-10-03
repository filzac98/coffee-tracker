import type { Brew } from "@/types/brew";
import Link from "next/link";
import DeleteBrewButton from "./DeleteBrewButton";

type BrewCardProps = {
  brew: Brew;
};

export default function BrewCard({ brew }: BrewCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="font-semibold">
            {brew.brewMethod}
          </p>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {brew.machine}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/brews/${brew.id}/edit`}
            className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Edit
          </Link>

          <DeleteBrewButton brewId={brew.id} />

          <span className="rounded-full bg-[var(--accent-light)] px-3 py-1 text-sm font-semibold text-[var(--accent)]">
            ★ {brew.rating}
          </span>
        </div>
      </div>

      {/* Brew recipe */}
      <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Recipe
          </p>

          <p className="mt-2 text-lg font-semibold">
            {brew.coffeeDose}g
            <span className="mx-2 text-[var(--accent)]">→</span>
            {brew.yield}g
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Time
          </p>

          <p className="mt-2 text-lg font-semibold">
            {brew.brewTime}s
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Grind
          </p>

          <p className="mt-2 text-lg font-semibold">
            {brew.grindSize}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Temperature
          </p>

          <p className="mt-2 text-lg font-semibold">
            {brew.waterTemp !== null
              ? `${brew.waterTemp}°C`
              : "—"}
          </p>
        </div>
      </div>

      {/* Notes */}
      {brew.notes && (
        <div className="mt-6 border-t border-[var(--border)] pt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Notes
          </p>

          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
            {brew.notes}
          </p>
        </div>
      )}
    </div>
  );
}