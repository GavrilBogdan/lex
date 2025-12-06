"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Coins, ShoppingBag, Package } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) {
    return <p className="text-white/60">Loading dashboard…</p>;
  }

  const chartData =
    stats.ordersLast7Days.length > 0
      ? stats.ordersLast7Days.map((d) => ({
          date: d._id,
          orders: d.count,
          revenue: d.total,
        }))
      : [{ date: "No data", orders: 0, revenue: 0 }];

  return (
    <div className="space-y-8 mt-[7rem]">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-sm text-white/60">Activitatea siteului</p>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Package size={20} />}
          label="Produse"
          value={stats.totalProducts}
        />
        <StatCard
          icon={<ShoppingBag size={20} />}
          label="Comenzi"
          value={stats.totalOrders}
        />
        <StatCard
          icon={<Coins size={20} />}
          label="Venituri"
          value={stats.totalRevenue.toFixed(2) + " lei"}
        />
      </div>

      {/* CHART */}
      <div
        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl
        p-4 md:p-6 shadow-2xl shadow-black/40"
      >
        <h2 className="text-lg font-semibold mb-2">
          Comenzi & Venituri (ultimele 7 zile)
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,15,15,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#facc15"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div
      className="flex items-center gap-3 rounded-3xl border border-white/10
      bg-white/5 backdrop-blur-2xl px-4 py-3 shadow-xl shadow-black/40"
    >
      <div className="p-2 rounded-2xl bg-black/40">{icon}</div>
      <div>
        <p className="text-xs text-white/60 uppercase tracking-wide">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
