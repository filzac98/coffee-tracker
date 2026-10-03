import Link from "next/link";
import AddBrewForm from "@/components/AddBrewForm";
import BrewCard from "@/components/BrewCard";
import type { Bean } from "@/types/bean";
import type { BeanStats } from "@/types/beanStats";
import DeleteBeanButton from "@/components/DeleteBeanButton";

type BeanPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BeanPage({ params }: BeanPageProps) {
  const { id } = await params;

  // Fetch the bean and its stats at the same time
  const [beanResponse, statsResponse] = await Promise.all([
    fetch(`http://localhost:3000/beans/${id}`),
    fetch(`http://localhost:3000/beans/${id}/stats`),
  ]);

  const bean: Bean = await beanResponse.json();
  const stats: BeanStats = await statsResponse.json();

  return (
  <main className="py-12">
    {/* Back navigation */}
    <Link
      href="/"
      className="mb-10 inline-flex text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
    >
      ← All beans
    </Link>

    {/* Bean hero */}
    <section className="mb-10">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
            {bean.roaster}
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {bean.name}
          </h1>

          <p className="mt-4 text-lg text-[var(--muted)]">
            {bean.origin} · {bean.process} · {bean.roastLevel} roast
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {bean.tastingNotes.map((note) => (
              <span
                key={note}
                className="rounded-full bg-[var(--accent-light)] px-3 py-1 text-sm text-[var(--foreground)]"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full bg-[var(--accent-light)] px-4 py-2 font-semibold text-[var(--accent)]">
            ★ {bean.rating}
          </div>

          <Link
            href={`/beans/${bean.id}/edit`}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium transition hover:border-[var(--accent)]"
          >
            Edit bean
          </Link>

          <DeleteBeanButton beanId={bean.id} />
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="mb-14 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-sm font-medium text-[var(--muted)]">
          Total brews
        </p>

        <p className="mt-2 text-3xl font-bold">
          {stats.brewCount}
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-sm font-medium text-[var(--muted)]">
          Average brew rating
        </p>

        <p className="mt-2 text-3xl font-bold">
          <span className="text-[var(--accent)]">★</span>{" "}
          {stats.averageRating}
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-sm font-medium text-[var(--muted)]">
          Best brew
        </p>

        <p className="mt-2 text-3xl font-bold">
          {stats.bestBrew ? (
            <>
              <span className="text-[var(--accent)]">★</span>{" "}
              {stats.bestBrew.rating}
            </>
          ) : (
            "—"
          )}
        </p>
      </div>
    </section>

    {/* Brew history */}
    <section className="mb-14">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold">
            Brew history
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Your previous brews with this bean.
          </p>
        </div>

        <span className="text-sm text-[var(--muted)]">
          {stats.brewCount}{" "}
          {stats.brewCount === 1 ? "brew" : "brews"}
        </span>
      </div>

      {bean.brews && bean.brews.length > 0 ? (
        <div className="grid gap-3">
          {bean.brews.map((brew) => (
            <BrewCard key={brew.id} brew={brew} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-10 text-center">
          <p className="font-semibold">
            No brews yet
          </p>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Add your first brew below.
          </p>
        </div>
      )}
    </section>

    {/* Add brew */}
    <section className="border-t border-[var(--border)] py-12">
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
          New recipe
        </p>

        <h2 className="text-2xl font-semibold">
          Add a brew
        </h2>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Log your latest brew and keep track of your recipe.
        </p>
      </div>

      <div className="max-w-2xl">
        <AddBrewForm beanId={bean.id} />
      </div>
    </section>
  </main>
);
}