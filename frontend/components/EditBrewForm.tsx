"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Brew } from "@/types/brew";

type EditBrewFormProps = {
  brew: Brew;
};

export default function EditBrewForm({ brew }: EditBrewFormProps) {
  const router = useRouter();

  const [brewMethod, setBrewMethod] = useState(brew.brewMethod);
  const [machine, setMachine] = useState(brew.machine);
  const [coffeeDose, setCoffeeDose] = useState(String(brew.coffeeDose));
  const [yieldAmount, setYieldAmount] = useState(String(brew.yield));
  const [brewTime, setBrewTime] = useState(String(brew.brewTime));
  const [grindSize, setGrindSize] = useState(brew.grindSize);
  const [waterTemp, setWaterTemp] = useState(
    brew.waterTemp !== null ? String(brew.waterTemp) : "",
  );
  const [rating, setRating] = useState(String(brew.rating));
  const [notes, setNotes] = useState(brew.notes ?? "");

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

    if (!isValidDecimal(coffeeDose)) {
      setError("Coffee dose must be a valid number.");
      setIsSubmitting(false);
      return;
    }

    if (!isValidDecimal(yieldAmount)) {
      setError("Yield must be a valid number.");
      setIsSubmitting(false);
      return;
    }

    if (!isValidDecimal(rating)) {
      setError("Rating must be a valid number.");
      setIsSubmitting(false);
      return;
    }

    if (waterTemp && !isValidDecimal(waterTemp)) {
      setError("Water temperature must be a valid number.");
      setIsSubmitting(false);
      return;
    }

    const parsedCoffeeDose = parseDecimal(coffeeDose);
    const parsedYield = parseDecimal(yieldAmount);
    const parsedRating = parseDecimal(rating);

    if (parsedCoffeeDose <= 0) {
      setError("Coffee dose must be greater than 0.");
      setIsSubmitting(false);
      return;
    }

    if (parsedYield <= 0) {
      setError("Yield must be greater than 0.");
      setIsSubmitting(false);
      return;
    }

    if (parsedRating < 1 || parsedRating > 5) {
      setError("Rating must be between 1 and 5.");
      setIsSubmitting(false);
      return;
    }

    const updatedBrew = {
      brewMethod,
      machine,
      coffeeDose: parsedCoffeeDose,
      yield: parsedYield,
      brewTime: Number(brewTime),
      grindSize,
      waterTemp: waterTemp ? parseDecimal(waterTemp) : undefined,
      rating: parsedRating,
      notes: notes || undefined,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/brews/${brew.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBrew),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update brew");
      }

      if (brew.bean) {
        router.push(`/beans/${brew.bean.id}`);
      } else {
        router.push("/");
      }

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
        {/* Brew method */}
        <div>
          <label className={labelClassName}>
            Brew method
          </label>

          <input
            type="text"
            required
            value={brewMethod}
            onChange={(event) => setBrewMethod(event.target.value)}
            className={inputClassName}
          />
        </div>

        {/* Machine */}
        <div>
          <label className={labelClassName}>
            Machine
          </label>

          <input
            type="text"
            required
            value={machine}
            onChange={(event) => setMachine(event.target.value)}
            className={inputClassName}
          />
        </div>

        {/* Coffee dose */}
        <div>
          <label className={labelClassName}>
            Coffee dose
            <span className="ml-1 text-[var(--muted)]">(g)</span>
          </label>

          <input
            type="text"
            inputMode="decimal"
            required
            value={coffeeDose}
            onChange={(event) => setCoffeeDose(event.target.value)}
            className={inputClassName}
          />
        </div>

        {/* Yield */}
        <div>
          <label className={labelClassName}>
            Yield
            <span className="ml-1 text-[var(--muted)]">(g)</span>
          </label>

          <input
            type="text"
            inputMode="decimal"
            required
            value={yieldAmount}
            onChange={(event) => setYieldAmount(event.target.value)}
            className={inputClassName}
          />
        </div>

        {/* Brew time */}
        <div>
          <label className={labelClassName}>
            Brew time
            <span className="ml-1 text-[var(--muted)]">(seconds)</span>
          </label>

          <input
            type="number"
            min="1"
            required
            value={brewTime}
            onChange={(event) => setBrewTime(event.target.value)}
            className={inputClassName}
          />
        </div>

        {/* Grind size */}
        <div>
          <label className={labelClassName}>
            Grind size
          </label>

          <input
            type="text"
            required
            value={grindSize}
            onChange={(event) => setGrindSize(event.target.value)}
            className={inputClassName}
          />
        </div>

        {/* Water temperature */}
        <div>
          <label className={labelClassName}>
            Water temperature
            <span className="ml-1 text-[var(--muted)]">(optional)</span>
          </label>

          <input
            type="text"
            inputMode="decimal"
            value={waterTemp}
            onChange={(event) => setWaterTemp(event.target.value)}
            className={inputClassName}
          />
        </div>

        {/* Rating */}
        <div>
          <label className={labelClassName}>
            Rating
            <span className="ml-1 text-[var(--muted)]">(1–5)</span>
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
      </div>

      {/* Notes */}
      <div className="mt-6">
        <label className={labelClassName}>
          Notes
          <span className="ml-1 text-[var(--muted)]">(optional)</span>
        </label>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          className={`${inputClassName} resize-none`}
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