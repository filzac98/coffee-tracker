import Link from "next/link";
import type { Bean } from "@/types/bean";

type BeanCardProps = {
  bean: Bean;
};

export default function BeanCard({ bean }: BeanCardProps) {
  return (
    <Link
      href={`/beans/${bean.id}`}
      className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--muted)]">
            {bean.roaster}
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            {bean.name}
          </h2>
        </div>

        <span className="shrink-0 rounded-full bg-[var(--accent-light)] px-3 py-1 text-sm font-semibold text-[var(--accent)]">
          ★ {bean.rating}
        </span>
      </div>

      {/* Coffee details */}
      <div className="mt-6">
        <p className="font-medium">
          {bean.origin}
        </p>

        <p className="mt-1 text-sm text-[var(--muted)]">
          {bean.process} · {bean.roastLevel} roast
        </p>
      </div>

      {/* Tasting notes */}
      <div className="mt-5 flex flex-wrap gap-2">
        {bean.tastingNotes.map((note) => (
          <span
            key={note}
            className="rounded-full bg-[var(--background)] px-3 py-1 text-xs text-[var(--muted)]"
          >
            {note}
          </span>
        ))}
      </div>

      {/* Link */}
      <p className="mt-auto pt-7 text-sm font-semibold text-[var(--accent)]">
        <span className="inline-block transition group-hover:translate-x-1">
          View bean →
        </span>
      </p>
    </Link>
  );
}