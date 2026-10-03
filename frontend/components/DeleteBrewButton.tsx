"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteBrewButtonProps = {
  brewId: number;
};

export default function DeleteBrewButton({
  brewId,
}: DeleteBrewButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this brew?",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/brews/${brewId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete brew");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-sm font-medium text-red-500 transition hover:text-red-700 disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}