import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/format";
import type { Product } from "../../types";
import { AlertTriangle, ShieldCheck, Box, Clock } from "lucide-react";

interface InventoryRow {
  product: Product;
  stocks: Array<{
    pointId: string;
    pointName: string;
    availableQuantity: number;
    reservedQuantity: number;
    safetyStock: number;
  }>;
}

interface InventoryTableProps {
  rows: InventoryRow[];
}

export const InventoryTable = ({ rows }: InventoryTableProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      {rows.map((row) => (
        <div
          key={row.product.id}
          className="glass-panel rounded-[32px] overflow-hidden border border-white/40 shadow-xl dark:border-white/5 dark:bg-slate-900/50"
        >
          <div className="px-8 py-6 bg-white/40 dark:bg-white/5 border-b border-white/40 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-white/10 overflow-hidden shadow-sm">
                <img
                  src={row.product.thumbnail}
                  alt={row.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {row.product.name}
                </h4>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">
                  {row.product.sku} • {row.product.category}
                </p>
              </div>
            </div>
            <div className="md:text-right flex flex-col items-start md:items-end">
              <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400 tracking-tighter">
                {formatCurrency(row.product.price)}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                {t("common.price_unit")} {row.product.unit}
              </p>
            </div>
          </div>

          <div className="p-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3 bg-white/20 dark:bg-transparent">
            {row.stocks.map((stock) => {
              const isLowStock = stock.availableQuantity <= stock.safetyStock;
              return (
                <div
                  key={`${row.product.id}-${stock.pointId}`}
                  className={`
                  glass-card p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group/item
                  ${isLowStock ? "border-rose-500/20 bg-rose-500/[0.03] dark:bg-rose-500/[0.05]" : "border-slate-200/50 bg-white/60 dark:bg-slate-800/40 dark:border-white/5"}
                `}
                >
                  <div className="flex justify-between items-start mb-6">
                    <p className="font-black text-slate-900 dark:text-white text-sm tracking-tight">
                      {stock.pointName}
                    </p>
                    {isLowStock && (
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-rose-600 dark:text-rose-400 uppercase bg-rose-50 dark:bg-rose-500/10 px-3 py-1 rounded-full border border-rose-200/50 dark:border-rose-500/20 shadow-sm animate-pulse">
                        <AlertTriangle className="w-3 h-3" />{" "}
                        {t("common.low_stock")}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        <Box className="w-2.5 h-2.5" /> {t("common.avail")}
                      </div>
                      <p
                        className={`text-lg font-black ${isLowStock ? "text-rose-600 dark:text-rose-400" : "text-cyan-600 dark:text-cyan-400"}`}
                      >
                        {stock.availableQuantity}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        <Clock className="w-2.5 h-2.5" /> {t("common.resv")}
                      </div>
                      <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        {stock.reservedQuantity}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        <ShieldCheck className="w-2.5 h-2.5" />{" "}
                        {t("common.safety")}
                      </div>
                      <p className="text-lg font-black text-slate-400 dark:text-slate-500">
                        {stock.safetyStock}
                      </p>
                    </div>
                  </div>

                  {/* Micro progress bar */}
                  <div className="mt-6 h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${isLowStock ? "bg-rose-500" : "bg-cyan-500"}`}
                      style={{
                        width: `${Math.min(100, (stock.availableQuantity / (stock.safetyStock * 2 || 100)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
