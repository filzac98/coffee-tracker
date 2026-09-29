import type { Bean } from "@/types/bean";
import BeanCard from "@/components/BeanCard";
import Link from "next/link";



export default async function Home() {
  const response = await fetch("http://localhost:3000/beans");

  const beans: Bean[] = await response.json();

  return (
  <main className="py-10">
    <section className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500">
          Coffee Tracker
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Your beans
        </h1>

        <p className="mt-3 max-w-xl text-gray-600">
          Keep track of your coffee and dial in the perfect brew.
        </p>
      </div>

      <Link
        href="/beans/new"
        className="shrink-0 rounded-xl bg-black px-5 py-3 font-medium text-white"
      >
        + Add bean
      </Link>
    </section>

    <section>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {beans.map((bean) => (
          <BeanCard key={bean.id} bean={bean} />
        ))}
      </div>
    </section>
  </main>
);
}