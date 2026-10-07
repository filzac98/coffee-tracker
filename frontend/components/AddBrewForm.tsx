"use client";

import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AddBrewFormProps = {
  beanId: number;
};

export default function AddBrewForm({ beanId }: AddBrewFormProps) {
  const [coffeeDose, setCoffeeDose] = useState("");
  const [yieldAmount, setYieldAmount] = useState("");
  const [brewTime, setBrewTime] = useState("");
  const [grindSize, setGrindSize] = useState("");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  const [waterTemp, setWaterTemp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

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
    setSuccess("");

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

    const newBrew = {
      beanId,
      brewMethod: "Espresso",
      machine: "Sage Barista Express",
      coffeeDose: parsedCoffeeDose,
      yield: parsedYield,
      brewTime: Number(brewTime),
      grindSize,
      waterTemp: waterTemp ? parseDecimal(waterTemp) : undefined,
      rating: parsedRating,
      notes: notes || undefined,
    };

    try {
      const response = await fetch(`${API_URL}/brews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBrew),
      });

      if (!response.ok) {
        throw new Error("Failed to create brew");
      }

      await response.json();

      setCoffeeDose("");
      setYieldAmount("");
      setBrewTime("");
      setGrindSize("");
      setWaterTemp("");
      setRating("");
      setNotes("");

      setSuccess("Brew added!");

      router.refresh();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setError("Failed to create brew");
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
            placeholder="18"
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
            placeholder="36"
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
            placeholder="30"
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
            placeholder="5"
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
            placeholder="93"
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
            placeholder="4.5"
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
          placeholder="Sweet, balanced, slightly fruity..."
          rows={4}
          className={`${inputClassName} resize-none`}
        />
      </div>

      {/* Feedback */}
      {error && (
        <p className="mt-4 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-4 text-sm font-medium text-green-700">
          {success}
        </p>
      )}

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Adding brew..." : "Add brew"}
        </button>
      </div>
    </form>
  );
}