import Link from "next/link";
import type { Bean } from "@/types/bean";

type BeanCardProps = {
  bean: Bean;
};

export default function BeanCard({ bean }: BeanCardProps) {
  return (
  <Link
    href={`/beans/${bean.id}`}
    className="group block rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="group block rounded-2xl border border-[#ded5c8] bg-[#fffdf9] p-6 transition hover:-translate-y-1 hover:border-[#b89b7a] hover:shadow-lg">
      <div>
        <p className="text-sm text-gray-500">{bean.roaster}</p>

        <h2 className="mt-1 text-xl font-semibold">
          {bean.name}
        </h2>
      </div>

      <span className="shrink-0 rounded-full bg-[#eadbc8] px-3 py-1 text-sm font-medium text-[#5c3d26]">
        ★ {bean.rating}
      </span>
    </div>

    <div className="mb-5">
      <p className="font-medium">{bean.origin}</p>

      <p className="mt-1 text-sm text-gray-500">
        {bean.process} · {bean.roastLevel} roast
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      {bean.tastingNotes.map((note) => (
        <span
          key={note}
          className="rounded-full bg-[#eee6da] px-3 py-1 text-xs text-[#695747]"
        >
          {note}
        </span>
      ))}
    </div>

    <p className="mt-6 text-sm font-medium transition group-hover:translate-x-1">
      View bean →
    </p>
  </Link>
);
}