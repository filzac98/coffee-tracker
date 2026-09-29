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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    const updatedBrew = {
      brewMethod,
      machine,
      coffeeDose: Number(coffeeDose),
      yield: Number(yieldAmount),
      brewTime: Number(brewTime),
      grindSize,
      waterTemp: waterTemp ? Number(waterTemp) : undefined,
      rating: Number(rating),
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

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-w-2xl gap-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Brew method</span>
          <input
            type="text"
            required
            value={brewMethod}
            onChange={(event) => setBrewMethod(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Machine</span>
          <input
            type="text"
            required
            value={machine}
            onChange={(event) => setMachine(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Coffee dose</span>
          <input
            type="number"
            step="any"
            min="0.1"
            required
            value={coffeeDose}
            onChange={(event) => setCoffeeDose(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Yield</span>
          <input
            type="number"
            step="any"
            min="0.1"
            required
            value={yieldAmount}
            onChange={(event) => setYieldAmount(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Brew time</span>
          <input
            type="number"
            min="1"
            required
            value={brewTime}
            onChange={(event) => setBrewTime(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Grind size</span>
          <input
            type="text"
            required
            value={grindSize}
            onChange={(event) => setGrindSize(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">
            Water temperature
          </span>
          <input
            type="number"
            step="any"
            value={waterTemp}
            onChange={(event) => setWaterTemp(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Rating</span>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            required
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium">Notes</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="min-h-28 rounded-xl border border-gray-300 px-3 py-2"
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