import {
  BarChart3,
  Boxes,
  BrainCircuit,
  ClipboardList,
  LayoutDashboard,
  ScrollText,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

export const Sidebar = () => {
  const { t } = useTranslation();

  const translatedNav = navigationItems.map((item) => {
    const translationKeys: Record<string, string> = {
      Dashboard: "common.dashboard",
      "Tồn kho": "common.inventory",
      "Decision Engine": "common.decision_engine",
      "Tạo đơn hàng": "common.create_order",
      "Nhật ký hệ thống": "common.logs",
      "Đơn hàng": "common.orders",
      "Thống kê hiệu suất": "common.statistics",
      "Quản lý kho": "common.warehouse_mgmt",
    };
    return { ...item, label: t(translationKeys[item.label] || item.label) };
  });

  return (
    <aside className="glass-panel flex flex-col h-full rounded-[36px] p-6 gap-6">
      {/* Logo */}
      <div className="flex items-center gap-4 px-2 pt-2">
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[18px] bg-linear-to-br from-indigo-600 to-cyan-500 shadow-lg shadow-indigo-500/30">
          <img
            src="../../../public/images/cabybara.png"
            alt="Capybara Logo"
            className="h-12 w-12 object-contain drop-shadow-md"
          />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            CAPYBARA
          </h2>
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-indigo-500 dark:text-indigo-400 mt-0.5">
            OPERATIONS
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar -mx-1 px-1">
        {translatedNav.map((item, index) => {
          const Icon = icons[index];
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                classNames(
                  "group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all duration-300",
                  isActive
                    ? "bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-indigo-300",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={classNames(
                      "rounded-xl p-2 transition-all duration-300",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:bg-slate-800/60 dark:text-slate-500 dark:group-hover:bg-indigo-500/15 dark:group-hover:text-indigo-400",
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-bold tracking-tight flex-1">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="rounded-2xl bg-indigo-50 dark:bg-[#0f1829] p-4 border border-indigo-100/60 dark:border-indigo-500/15">
        <div className="flex items-center gap-2 mb-2">
          <BrainCircuit
            size={15}
            className="text-indigo-500 dark:text-indigo-400"
          />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            {t("sidebar.prototype_highlight")}
          </p>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
          {t("sidebar.highlight_desc")}
        </p>
      </div>
    </aside>
  );
};
