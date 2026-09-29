import Link from "next/link";
import type { Brew } from "@/types/brew";
import EditBrewForm from "@/components/EditBrewForm";

type EditBrewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBrewPage({
  params,
}: EditBrewPageProps) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/brews/${id}`
  );

  const brew: Brew = await response.json();

  return (
    <main className="py-10">
      <Link
        href={brew.bean ? `/beans/${brew.bean.id}` : "/"}
        className="mb-8 inline-block text-sm text-gray-500 hover:text-black"
      >
        ← Back
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Edit brew
        </h1>

        <p className="mt-3 text-gray-600">
          Update your brew recipe and notes.
        </p>
      </div>

      <EditBrewForm brew={brew} />
    </main>
  );
}