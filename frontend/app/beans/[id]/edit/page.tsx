import Link from "next/link";
import type { Bean } from "@/types/bean";
import EditBeanForm from "@/components/EditBeanForm";

type EditBeanPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBeanPage({
  params,
}: EditBeanPageProps) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/beans/${id}`
  );

  const bean: Bean = await response.json();

  return (
    <main className="py-10">
      <Link
        href={`/beans/${id}`}
        className="mb-8 inline-block text-sm text-gray-500 hover:text-black"
      >
        ← Back to bean
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Edit bean
        </h1>

        <p className="mt-3 text-gray-600">
          Update the details for {bean.name}.
        </p>
      </div>

      <EditBeanForm bean={bean} />
    </main>
  );
}