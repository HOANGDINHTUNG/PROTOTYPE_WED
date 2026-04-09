import {
  BarChart3,
  Boxes,
  BrainCircuit,
  ClipboardList,
  LayoutDashboard,
  ScrollText,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../constants/navigation";
import { classNames } from "../../utils/classNames";

const icons = [
  LayoutDashboard,
  ClipboardList,
  BrainCircuit,
  BarChart3,
  Boxes,
  ScrollText,
];

export const Sidebar = () => (
  <aside className="flex flex-col h-full rounded-[32px] border border-white/10 bg-slate-900/75 p-5 backdrop-blur-xl">
    <div className="mb-8 flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-xl font-black text-cyan-300 ring-1 ring-cyan-300/20">
        HN
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">HANOLA</h2>
        <p className="text-sm text-slate-400">
          Client src - clean architecture
        </p>
      </div>
    </div>

    <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
      {navigationItems.map((item, index) => {
        const Icon = icons[index];
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              classNames(
                "group flex items-start gap-3 rounded-2xl px-4 py-3 transition-all",
                isActive
                  ? "bg-cyan-400/10 text-white ring-1 ring-cyan-300/25"
                  : "text-slate-300 hover:bg-white/5 hover:text-white",
              )
            }
          >
            <span className="mt-0.5 rounded-xl bg-white/5 p-2 text-cyan-300 group-hover:bg-cyan-400/10">
              <Icon size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs text-slate-400">
                {item.description}
              </span>
            </span>
          </NavLink>
        );
      })}
    </nav>

    <div className="mt-auto pt-6">
      <div className="rounded-3xl bg-gradient-to-br from-cyan-400/10 to-indigo-400/10 p-4 ring-1 ring-white/10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Điểm nhấn prototype
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-200">
          Không chỉ hiển thị đơn hàng, mà còn giải thích cách hệ thống quyết
          định kho/cửa hàng xử lý theo tồn kho, khoảng cách và tải vận hành.
        </p>
      </div>
    </div>
  </aside>
);
