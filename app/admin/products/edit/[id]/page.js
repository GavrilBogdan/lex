"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProduct({ params }) {
  const router = useRouter();

  // ✔ unwrap params Promise (fixes your error)
  const { id } = use(params);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/products/get?id=${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.log("LOAD ERROR:", e);
      }
    }
    load();
  }, [id]);

  async function saveProduct(e) {
    e.preventDefault();

    await fetch(`/api/products?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    router.push("/admin/products");
  }

  if (!product)
    return (
      <p className="text-white mt-[7rem] text-center text-xl">
        Se încarcă produsul...
      </p>
    );

  return (
    <form
      onSubmit={saveProduct}
      className="text-white space-y-4 max-w-xl mt-[7rem]"
    >
      <h1 className="text-3xl font-bold mb-6">Editează Produs</h1>

      <input
        className="bg-white/10 p-3 rounded w-full"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />

      <textarea
        className="bg-white/10 p-3 rounded w-full"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />

      <input
        className="bg-white/10 p-3 rounded w-full"
        type="number"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />

      <input
        className="bg-white/10 p-3 rounded w-full"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />

      <button className="bg-amber-600 px-4 py-2 rounded text-black font-semibold">
        Salvează
      </button>
    </form>
  );
}
