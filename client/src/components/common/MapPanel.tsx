import { Card } from "./Card";
import { MapPin } from "lucide-react";
import { useAppSelector } from "../../hooks/redux";
import { selectSnapshot } from "../../features/simulation/simulationSlice";

export const MapPanel = () => {
  const snapshot = useAppSelector(selectSnapshot);
  const points = snapshot?.fulfillmentPoints ?? [];

  return (
    <Card title="Mini Map" subtitle="Bản đồ mô phỏng TP.HCM (placeholder)">
      <div className="w-full h-64 bg-linear-to-br from-slate-100 to-white/40 dark:from-slate-800 dark:to-transparent rounded-xl p-4">
        <div className="grid grid-cols-3 gap-3">
          {points.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 p-2 bg-white/60 dark:bg-slate-800/50 rounded-lg border border-white/30"
            >
              <MapPin className="w-5 h-5 text-cyan-600" />
              <div className="flex-1">
                <div className="font-black text-sm">{p.name}</div>
                <div className="text-xs text-slate-400">
                  Active {p.activeOrders} •{" "}
                  {p.inventory.reduce((s, i) => s + i.availableQuantity, 0)}{" "}
                  avail
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MapPanel;
