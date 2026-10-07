import { API_URL } from "@/lib/api";
import type { Bean } from "@/types/bean";
import type { DashboardStats } from "@/types/dashboardStats";
import BeanCard from "@/components/BeanCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [beansResponse, statsResponse] = await Promise.all([
    fetch(`${API_URL}/beans`),
    fetch(`${API_URL}/dashboard/stats`),
  ]);

  const beans: Bean[] = await beansResponse.json();
  const stats: DashboardStats = await statsResponse.json();

  return (
    <main className="py-12">
      {/* Intro */}
      <section className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Coffee Tracker
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Your coffee, dialled in.
        </h1>

        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          Track your beans, recipes and progress towards the perfect cup.
        </p>
      </section>

      {/* Dashboard */}
      <section className="mb-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-sm font-medium text-[var(--muted)]">
              Beans
            </p>
            <p className="mt-2 text-3xl font-bold">
              {stats.totalBeans}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-sm font-medium text-[var(--muted)]">
              Brews
            </p>
            <p className="mt-2 text-3xl font-bold">
              {stats.totalBrews}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-sm font-medium text-[var(--muted)]">
              Average rating
            </p>
            <p className="mt-2 text-3xl font-bold">
              <span className="text-[var(--accent)]">★</span>{" "}
              {stats.averageBrewRating}
            </p>
          </div>
        </div>
      </section>

      {/* Highest-rated bean */}
      {stats.highestRatedBean && (
  <Link
    href={`/beans/${stats.highestRatedBean.id}`}
    className="group mb-14 block rounded-2xl bg-[var(--foreground)] p-7 transition hover:-translate-y-0.5"
  >
    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-light)]">
      ★ Highest-rated bean
    </p>

    <div className="flex items-end justify-between gap-6">
      <div>
        <h2 className="text-3xl font-semibold text-[var(--surface)]">
          {stats.highestRatedBean.name}
        </h2>

        <p className="mt-2 text-[var(--accent-light)]">
          {stats.highestRatedBean.roaster}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-[var(--accent-light)]">
          Rating
        </p>

        <p className="mt-1 text-3xl font-bold text-[var(--surface)]">
          <span className="text-[var(--accent)]">★</span>{" "}
          {stats.highestRatedBean.rating}
        </p>
      </div>
    </div>
  </Link>
)}

      {/* Beans */}
      <section className="pb-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              Your beans
            </h2>

            <p className="mt-1 text-sm text-[var(--muted)]">
              Your current coffee collection.
            </p>
          </div>

          <span className="text-sm text-[var(--muted)]">
            {stats.totalBeans}{" "}
            {stats.totalBeans === 1 ? "bean" : "beans"}
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {beans.map((bean) => (
            <BeanCard key={bean.id} bean={bean} />
          ))}
        </div>
      </section>
    </main>
  );
}