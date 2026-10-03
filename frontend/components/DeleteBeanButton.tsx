"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteBeanButtonProps = {
  beanId: number;
};

export default function DeleteBeanButton({
  beanId,
}: DeleteBeanButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bean?",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/beans/${beanId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete bean");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete bean"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}