import Link from "next/link";
import AddBeanForm from "@/components/AddBeanForm";

export default function NewBeanPage() {
  return (
    <main className="py-10">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gray-500 hover:text-black"
      >
        ← All beans
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Add a new bean
        </h1>

        <p className="mt-3 text-gray-600">
          Add a new bag of coffee to your collection.
        </p>
      </div>

      <AddBeanForm />
    </main>
  );
}