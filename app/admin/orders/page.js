"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-white mt-[7rem] text-center">
        Se încarcă comenzile...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-white mt-[7rem] text-center">
        Nu există comenzi momentan.
      </div>
    );
  }

  return (
    <div className="mt-[7rem] p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Comenzi</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold mb-2">
              Comandă #{order._id.slice(-6)}
            </h2>

            <p className="text-gray-300 text-sm mb-3">
              Plasată pe: {new Date(order.createdAt).toLocaleString()}
            </p>

            <p className="text-lg font-semibold text-amber-400 mb-2">
              Total: {order.total} lei
            </p>

            <div className="mt-3 text-gray-300">
              <h3 className="font-semibold mb-1">Produse:</h3>
              <ul className="list-disc pl-6 space-y-1">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} — {item.price} lei
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-gray-400 text-sm">
              <p>
                <strong>Nume:</strong> {order.customerName}
              </p>
              <p>
                <strong>Telefon:</strong> {order.phone}
              </p>
              <p>
                <strong>Adresă:</strong> {order.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
