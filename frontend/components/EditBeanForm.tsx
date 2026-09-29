"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Bean } from "@/types/bean";

type EditBeanFormProps = {
  bean: Bean;
};

export default function EditBeanForm({ bean }: EditBeanFormProps) {
  const router = useRouter();

  const [name, setName] = useState(bean.name);
  const [roaster, setRoaster] = useState(bean.roaster);
  const [origin, setOrigin] = useState(bean.origin);
  const [process, setProcess] = useState(bean.process);
  const [roastLevel, setRoastLevel] = useState(bean.roastLevel);
  const [roastDate, setRoastDate] = useState(bean.roastDate);
  const [tastingNotes, setTastingNotes] = useState(
    bean.tastingNotes.join(", "),
  );
  const [rating, setRating] = useState(String(bean.rating));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    const updatedBean = {
      name,
      roaster,
      origin,
      process,
      roastLevel,
      roastDate,
      tastingNotes: tastingNotes
        .split(",")
        .map((note) => note.trim())
        .filter((note) => note.length > 0),
      rating: Number(rating),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/beans/${bean.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBean),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update bean");
      }

      router.push(`/beans/${bean.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-w-2xl gap-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Bean name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Roaster</span>
          <input
            type="text"
            required
            value={roaster}
            onChange={(event) => setRoaster(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Origin</span>
          <input
            type="text"
            required
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Process</span>
          <input
            type="text"
            required
            value={process}
            onChange={(event) => setProcess(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Roast level</span>

          <select
            required
            value={roastLevel}
            onChange={(event) => setRoastLevel(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          >
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Roast date</span>
          <input
            type="date"
            required
            value={roastDate}
            onChange={(event) => setRoastDate(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium">Tasting notes</span>
        <input
          type="text"
          required
          value={tastingNotes}
          onChange={(event) => setTastingNotes(event.target.value)}
          className="rounded-xl border border-gray-300 px-3 py-2"
        />

        <span className="text-xs text-gray-500">
          Separate tasting notes with commas.
        </span>
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium">Rating</span>
        <input
          type="number"
          required
          min="1"
          max="5"
          step="0.1"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          className="rounded-xl border border-gray-300 px-3 py-2"
        />
      </label>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-xl bg-black px-5 py-3 font-medium text-white disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}