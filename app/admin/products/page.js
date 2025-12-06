"use client";

import { useEffect, useState } from "react";
import { Trash2, Pencil, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function deleteProduct(id) {
    if (!confirm("Ștergi acest produs?")) return;

    await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        Se încarcă produsele...
      </div>
    );
  }

  return (
    <div className="text-white mt-[7rem]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Produse</h1>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700
                     px-4 py-2 rounded-lg text-black font-semibold transition"
        >
          <PlusCircle size={18} /> Adaugă Produs
        </Link>
      </div>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white/5 border border-white/10 rounded-xl p-4
                       flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  p.image && p.image.trim() !== ""
                    ? p.image
                    : "https://placehold.co/100x100?text=No+Image"
                }
                className="h-16 w-16 rounded-xl object-cover"
              />

              <div>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-gray-400 text-sm">{p.description}</p>
                <p className="text-amber-400 font-semibold">{p.price} lei</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/admin/products/edit/${p._id}`}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
              >
                <Pencil size={18} />
              </Link>

              <button
                onClick={() => deleteProduct(p._id)}
                className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-gray-500 text-center pt-10">
            Nu există produse momentan.
          </p>
        )}
      </div>
    </div>
  );
}
