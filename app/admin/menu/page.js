"use client";

import { useEffect, useState } from "react";

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "beverages",
  });

  async function load() {
    const res = await fetch("/api/menu");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function addItem(e) {
    e.preventDefault();
    await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", price: "", category: "beverages" });
    load();
  }

  async function deleteItem(id) {
    await fetch(`/api/menu?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="text-white max-w-3xl mx-auto mt-[7rem]">
      <h1 className="text-3xl font-bold mb-6">Admin Meniu</h1>

      <form onSubmit={addItem} className="space-y-4 bg-white/10 p-6 rounded-xl">
        <input
          className="w-full p-3 bg-white/10 rounded"
          placeholder="Nume produs"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-3 bg-white/10 rounded"
          placeholder="Pret"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <select
          className="w-full p-3 bg-white/10 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="beverages">Beverages</option>
          <option value="bites">Bites</option>
        </select>

        <button className="bg-amber-500 px-6 py-2 rounded text-black font-bold">
          Adauga
        </button>
      </form>

      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between bg-white/5 p-4 rounded-xl"
          >
            <span>
              {item.name} — {item.price} RON ({item.category})
            </span>
            <button
              onClick={() => deleteItem(item._id)}
              className="text-red-400"
            >
              Șterge
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
