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

  function parseDecimal(value: string) {
    return Number(value.replace(",", "."));
  }

  function isValidDecimal(value: string) {
    const number = parseDecimal(value);

    return value.trim() !== "" && Number.isFinite(number);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    if (!isValidDecimal(rating)) {
      setError("Rating must be a valid number.");
      setIsSubmitting(false);
      return;
    }

    const parsedRating = parseDecimal(rating);

    if (parsedRating < 1 || parsedRating > 5) {
      setError("Rating must be between 1 and 5.");
      setIsSubmitting(false);
      return;
    }

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
      rating: parsedRating,
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

  const inputClassName =
    "mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)]";

  const labelClassName =
    "block text-sm font-medium text-[var(--foreground)]";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClassName}>Bean name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Roaster</label>
          <input
            type="text"
            required
            value={roaster}
            onChange={(event) => setRoaster(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Origin</label>
          <input
            type="text"
            required
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Process</label>
          <input
            type="text"
            required
            value={process}
            onChange={(event) => setProcess(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Roast level</label>
          <select
            required
            value={roastLevel}
            onChange={(event) => setRoastLevel(event.target.value)}
            className={inputClassName}
          >
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label className={labelClassName}>Roast date</label>
          <input
            type="date"
            required
            value={roastDate}
            onChange={(event) => setRoastDate(event.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClassName}>Tasting notes</label>
        <input
          type="text"
          required
          value={tastingNotes}
          onChange={(event) => setTastingNotes(event.target.value)}
          className={inputClassName}
        />

        <p className="mt-2 text-xs text-[var(--muted)]">
          Separate tasting notes with commas.
        </p>
      </div>

      <div className="mt-6">
        <label className={labelClassName}>
          Rating
          <span className="ml-1 text-[var(--muted)]">
            (1–5)
          </span>
        </label>

        <input
          type="text"
          inputMode="decimal"
          required
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          className={inputClassName}
        />
      </div>

      {error && (
        <p className="mt-4 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}