import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ToastContainer } from "../common/Toast";

export const AppShell = () => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_35%,_#111827_100%)] text-white">
    <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-4">
      <div className="lg:sticky lg:top-0 lg:h-screen lg:py-4">
        <Sidebar />
      </div>
      <div className="flex min-h-[calc(100vh-2rem)] flex-col gap-4">
        <Header />
        <main className="flex-1 rounded-[32px] border border-white/10 bg-slate-950/35 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
    <ToastContainer />
  </div>
);
