"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    rating: 5,
    image: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const err = await res.json();
      alert("Error: " + err.error);
      return;
    }

    alert("Product created!");
    router.push("/admin/products");
  }

  return (
    <div className="max-w-xl space-y-6 mt-[7rem]">
      <h1 className="text-2xl font-bold">Adauga un produs</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40"
      >
        <Input
          label="Denumire"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <Input
          label="Descriere"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          label="Pret (lei)"
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
        />
        <Input
          label="Rating (1-5)"
          name="rating"
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
        />
        <Input
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600
          text-sm font-medium text-black transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving…" : "Creeaza produs"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-1 text-sm">
      <label className="block text-xs text-white/70">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl bg-black/40 border border-white/15 px-3 py-2
        text-sm outline-none focus:border-emerald-400"
      />
    </div>
  );
}
