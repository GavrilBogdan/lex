"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  ListOrdered,
  LogOut,
  Coffee,
} from "lucide-react";
import { signOut } from "next-auth/react";

export function Sidebar() {
  return (
    <aside
      className="w-64 hidden md:flex flex-col gap-4 p-4
      bg-white/5 border-r border-white/10 backdrop-blur-2xl mt-[7rem]"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">LexCoffee</h1>
        <p className="text-xs text-white/60">Admin Dashboard</p>
      </div>

      <nav className="flex flex-col gap-2 text-sm">
        <NavLink href="/admin" icon={<LayoutDashboard size={18} />}>
          Dashboard
        </NavLink>
        <NavLink href="/admin/products" icon={<ShoppingBag size={18} />}>
          Produse
        </NavLink>
        <NavLink href="/admin/products/new" icon={<PlusCircle size={18} />}>
          Adauga Produs
        </NavLink>
        <NavLink href="/admin/menu" icon={<Coffee size={18} />}>
          Meniu
        </NavLink>
        <NavLink href="/admin/orders" icon={<ListOrdered size={18} />}>
          Comenzi
        </NavLink>
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-auto flex items-center gap-2 text-xs text-red-300 hover:text-red-400"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}

function NavLink({ href, icon, children }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-xl
      bg-white/0 hover:bg-white/10 transition
      text-white/80 hover:text-white"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
