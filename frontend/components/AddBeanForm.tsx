"use client";

import { API_URL } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBeanForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [roaster, setRoaster] = useState("");
  const [origin, setOrigin] = useState("");
  const [process, setProcess] = useState("");
  const [roastLevel, setRoastLevel] = useState("");
  const [roastDate, setRoastDate] = useState("");
  const [tastingNotes, setTastingNotes] = useState("");
  const [rating, setRating] = useState("");

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

    const newBean = {
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
      const response = await fetch(`${API_URL}/beans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBean),
      });

      if (!response.ok) {
        throw new Error("Failed to create bean");
      }

      const createdBean = await response.json();

      router.push(`/beans/${createdBean.id}`);
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
        {/* Bean name */}
        <div>
          <label className={labelClassName}>
            Bean name
          </label>

          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClassName}
            placeholder="Konga"
          />
        </div>

        {/* Roaster */}
        <div>
          <label className={labelClassName}>
            Roaster
          </label>

          <input
            type="text"
            required
            value={roaster}
            onChange={(event) => setRoaster(event.target.value)}
            className={inputClassName}
            placeholder="Coffee Collective"
          />
        </div>

        {/* Origin */}
        <div>
          <label className={labelClassName}>
            Origin
          </label>

          <input
            type="text"
            required
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className={inputClassName}
            placeholder="Ethiopia"
          />
        </div>

        {/* Process */}
        <div>
          <label className={labelClassName}>
            Process
          </label>

          <input
            type="text"
            required
            value={process}
            onChange={(event) => setProcess(event.target.value)}
            className={inputClassName}
            placeholder="Washed"
          />
        </div>

        {/* Roast level */}
        <div>
          <label className={labelClassName}>
            Roast level
          </label>

          <select
            required
            value={roastLevel}
            onChange={(event) => setRoastLevel(event.target.value)}
            className={inputClassName}
          >
            <option value="">Select roast level</option>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Roast date */}
        <div>
          <label className={labelClassName}>
            Roast date
          </label>

          <input
            type="date"
            required
            value={roastDate}
            onChange={(event) => setRoastDate(event.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Tasting notes */}
      <div className="mt-6">
        <label className={labelClassName}>
          Tasting notes
        </label>

        <input
          type="text"
          required
          value={tastingNotes}
          onChange={(event) => setTastingNotes(event.target.value)}
          className={inputClassName}
          placeholder="jasmine, bergamot, peach"
        />

        <p className="mt-2 text-xs text-[var(--muted)]">
          Separate tasting notes with commas.
        </p>
      </div>

      {/* Rating */}
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
          placeholder="4.5"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Adding bean..." : "Add bean"}
        </button>
      </div>
    </form>
  );
}