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
    <main className="py-10">
      {/* Back navigation */}
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gray-500 hover:text-black"
      >
        ← All beans
      </Link>

      {/* Bean information */}
      <section className="mb-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm text-gray-500">{bean.roaster}</p>

            <h1 className="mt-1 text-4xl font-bold tracking-tight">
              {bean.name}
            </h1>

            <p className="mt-3 text-gray-600">
              {bean.origin} · {bean.process} · {bean.roastLevel} roast
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {bean.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
                href={`/beans/${bean.id}/edit`}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium"
            >
                Edit bean
            </Link>

            <DeleteBeanButton beanId={bean.id} />

            <div className="rounded-full bg-gray-100 px-4 py-2 font-medium">
                ★ {bean.rating}
            </div>
          </div>
          
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#ded5c8] bg-[#fffdf9] p-5">
          <p className="text-sm text-gray-500">Total brews</p>
          <p className="mt-2 text-3xl font-semibold">{stats.brewCount}</p>
        </div>

        <div className="rounded-2xl border border-[#ded5c8] bg-[#fffdf9] p-5">
          <p className="text-sm text-gray-500">Average rating</p>
          <p className="mt-2 text-3xl font-semibold">
            ★ {stats.averageRating}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded5c8] bg-[#fffdf9] p-5">
          <p className="text-sm text-gray-500">Best brew</p>
          <p className="mt-2 text-3xl font-semibold">
            {stats.bestBrew ? `★ ${stats.bestBrew.rating}` : "—"}
          </p>
        </div>
      </section>

      {/* Add brew */}
      <section className="border-t border-[#ded5c8] bg-[#fffdf9] pt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Add a brew</h2>
          <p className="mt-1 text-sm text-gray-500">
            Log your latest brew and keep track of your recipe.
          </p>
        </div>

        <div className="max-w-2xl">
          <AddBrewForm beanId={bean.id} />
        </div>
      </section>

      {/* Brew history */}
      <section className="mb-12">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Brew history</h2>
            <p className="mt-1 text-sm text-gray-500">
              Your previous brews with this bean.
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {stats.brewCount} {stats.brewCount === 1 ? "brew" : "brews"}
          </span>
        </div>

        {bean.brews && bean.brews.length > 0 ? (
          <div className="grid gap-3">
            {bean.brews.map((brew) => (
              <BrewCard key={brew.id} brew={brew} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center">
            <p className="font-medium">No brews yet</p>
            <p className="mt-1 text-sm text-gray-500">
              Add your first brew below.
            </p>
          </div>
        )}
      </section>

    </main>
  );
}