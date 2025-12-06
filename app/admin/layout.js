import "../globals.css";
import { Sidebar } from "./sidebar";

export const metadata = {
  title: "LexCoffee Admin",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-amber-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
