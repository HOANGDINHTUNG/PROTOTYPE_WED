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

export const InventoryTable = ({ rows }: InventoryTableProps) => (
  <div className="space-y-6">
    {rows.map((row) => (
      <div
        key={row.product.id}
        className="glass-panel rounded-2xl overflow-hidden border border-white/10"
      >
        <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl border border-white/10 bg-slate-900 overflow-hidden">
              <img
                src={row.product.thumbnail}
                alt={row.product.name}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div>
              <h4 className="text-lg font-black text-white tracking-tight">
                {row.product.name}
              </h4>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {row.product.sku} • {row.product.category}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-cyan-400 tracking-tighter">
              {formatCurrency(row.product.price)}
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">
              Price per {row.product.unit}
            </p>
          </div>
        </div>

        <div className="p-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {row.stocks.map((stock) => {
            const isLowStock = stock.availableQuantity <= stock.safetyStock;
            return (
              <div
                key={`${row.product.id}-${stock.pointId}`}
                className={`
                glass-card p-4 rounded-xl border relative overflow-hidden
                ${isLowStock ? "border-amber-500/30 bg-amber-500/[0.03]" : "border-white/5 bg-slate-900/40"}
              `}
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="font-bold text-white text-sm">
                    {stock.pointName}
                  </p>
                  {isLowStock && (
                    <div className="flex items-center gap-1 text-[10px] font-black text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      <AlertTriangle className="w-3 h-3" /> Low Stock
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase">
                      <Box className="w-2.5 h-2.5" /> Avail
                    </div>
                    <p
                      className={`text-sm font-black ${isLowStock ? "text-amber-400" : "text-emerald-400"}`}
                    >
                      {stock.availableQuantity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase">
                      <Clock className="w-2.5 h-2.5" /> Resv
                    </div>
                    <p className="text-sm font-black text-indigo-400">
                      {stock.reservedQuantity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase">
                      <ShieldCheck className="w-2.5 h-2.5" /> Safety
                    </div>
                    <p className="text-sm font-black text-slate-400">
                      {stock.safetyStock}
                    </p>
                  </div>
                </div>

                {/* Micro progress bar */}
                <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${isLowStock ? "bg-amber-500" : "bg-cyan-500"}`}
                    style={{
                      width: `${Math.min(100, (stock.availableQuantity / 40) * 100)}%`,
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
