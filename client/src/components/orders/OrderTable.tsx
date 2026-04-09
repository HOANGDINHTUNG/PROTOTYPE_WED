import type { Order, Product } from "../../types";
import { formatCurrency, formatDateTime } from "../../utils/format";
import { LifecycleStepper } from "./LifecycleStepper";
import { ShoppingBag, MapPin, Calendar, ArrowRight } from "lucide-react";

interface OrderTableProps {
  orders: Order[];
  products: Product[];
}

export const OrderTable = ({ orders, products }: OrderTableProps) => {
  const productNameById = new Map(
    products.map((product) => [product.id, product.name]),
  );

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
      <div className="px-6 py-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white tracking-tight">
            Danh sách đơn hàng
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Quản lý và theo dõi lộ trình của từng đơn hàng trong hệ thống
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Live Updates
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="bg-slate-900/40 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <th className="px-6 py-4">Mã đơn & Khách hàng</th>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Điểm xử lý</th>
              <th className="px-6 py-4">Lộ trình (Life-cycle)</th>
              <th className="px-6 py-4 text-right">Tổng thanh toán</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-slate-500 italic"
                >
                  Chưa có đơn hàng nào được tạo...
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-cyan-400 tracking-tighter">
                          {order.code}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-slate-800 text-slate-400 border border-white/5">
                          {order.channel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                        {order.customerName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs"
                        >
                          <ShoppingBag className="w-3 h-3 text-slate-500" />
                          <span className="text-slate-300">
                            {productNameById.get(item.productId) ??
                              item.productId}
                          </span>
                          <span className="text-slate-500 font-bold uppercase text-[9px]">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {order.fulfilledByPointName ? (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                          <MapPin className="w-3 h-3 text-indigo-400" />
                          {order.fulfilledByPointName}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <ArrowRight className="w-2.5 h-2.5" />
                          Cách khách {order.shippingDistanceKm} km
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-600 uppercase italic">
                        Đang phân bổ...
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <LifecycleStepper currentStatus={order.status} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <div className="font-black text-white text-base tracking-tight">
                        {formatCurrency(order.totalAmount)}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                        <Calendar className="w-2.5 h-2.5" />
                        {formatDateTime(order.createdAt).split(" ")[0]}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
