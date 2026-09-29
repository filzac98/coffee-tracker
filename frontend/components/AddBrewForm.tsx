"use client";

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const newBrew = {
        beanId,
        brewMethod: "Espresso",
        machine: "Sage Barista Express",
        coffeeDose: Number(coffeeDose),
        yield: Number(yieldAmount),
        brewTime: Number(brewTime),
        grindSize,
        waterTemp: waterTemp ? Number(waterTemp) : undefined,
        rating: Number(rating),
        notes: notes || undefined,
    };

    try {
    const response = await fetch("http://localhost:3000/brews", {
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

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <div>
        <label className="mb-1 block text-sm">Coffee dose (g)</label>
        <input
          type="number"
          step="any"
          min="0.1"
          required
          value={coffeeDose}
          onChange={(event) => setCoffeeDose(event.target.value)}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Yield (g)</label>
        <input
          type="number"
          step="any"
          min="0.1"
          required
          value={yieldAmount}
          onChange={(event) => setYieldAmount(event.target.value)}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Brew time (seconds)</label>
        <input
          type="number"
          step="any"
          min="1"
          required
          value={brewTime}
          onChange={(event) => setBrewTime(event.target.value)}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">Grind size</label>
        <input
          type="text"
          required
          value={grindSize}
          onChange={(event) => setGrindSize(event.target.value)}
          className="w-full rounded-lg border p-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm">Water temperature (optional)</label>
        <input
            type="number"
            step="any"
            value={waterTemp}
            onChange={(event) => setWaterTemp(event.target.value)}
            className="w-full rounded-lg border p-2"
        />
        </div>

        <div>
        <label className="mb-1 block text-sm">Rating (1–5)</label>
        <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            required
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            className="w-full rounded-lg border p-2"
        />
        </div>

        <div>
        <label className="mb-1 block text-sm">Notes (optional)</label>
        <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full rounded-lg border p-2"
            rows={3}
        />
        </div>

        {error && (
            <p className="text-sm text-red-600">
                {error}
            </p>
        )}

        {success && (
            <p className="text-sm text-green-600">
                {success}
            </p>
        )}
        <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
            >
            {isSubmitting ? "Adding..." : "Add brew"}
        </button>
    </form>
  );
}