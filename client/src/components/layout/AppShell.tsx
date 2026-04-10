import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ToastContainer } from "../common/Toast";

export const AppShell = () => (
  <div className="min-h-screen transition-colors duration-500 text-slate-900 dark:text-white">
    <div className="mx-auto grid min-h-screen max-w-500 grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
      <div className="lg:sticky lg:top-0 lg:h-screen lg:py-6">
        <Sidebar />
      </div>
      <div className="flex min-h-[calc(100vh-3rem)] flex-col gap-6 py-6">
        <Header />
        <main className="flex-1 rounded-[36px] border border-slate-200/60 dark:border-indigo-500/10 bg-white/90 dark:bg-[#080d1a] p-6 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_12px_40px_-8px_rgba(100,116,139,0.1)] dark:shadow-[0_1px_0_rgba(99,102,241,0.05)_inset] backdrop-blur-2xl dark:backdrop-blur-none md:p-10 transition-all duration-700">
          <Outlet />
        </main>
      </div>
    </div>
    <ToastContainer />
  </div>
);
