import { useMemo, useState } from 'react';
import { customerAreas, fulfillmentModes, paymentMethods, salesChannels } from '../../constants/domain';
import type { CreateOrderInput, Product } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface OrderCreationFormProps {
  products: Product[];
  onPreview: (input: CreateOrderInput) => void;
}

const defaultProductId = '';

export const OrderCreationForm = ({ products, onPreview }: OrderCreationFormProps) => {
  const [form, setForm] = useState<CreateOrderInput>({
    customerName: 'Khách demo logistics',
    customerArea: 'Quận 10',
    channel: 'Shopee',
    fulfillmentMode: 'Giao tận nơi',
    paymentMethod: 'COD',
    notes: 'Đơn mô phỏng để kiểm tra logic phân bổ',
    items: [{ productId: defaultProductId, quantity: 1 }],
  });

  const firstProductId = useMemo(() => products[0]?.id ?? '', [products]);

  const normalizedForm = useMemo<CreateOrderInput>(() => ({
    ...form,
    items: [
      {
        productId: form.items[0]?.productId || firstProductId,
        quantity: form.items[0]?.quantity || 1,
      },
    ],
  }), [firstProductId, form]);

  return (
    <Card title="Tạo đơn hàng mô phỏng" subtitle="Tập trung đúng flow prototype: chọn kênh, sản phẩm, khu vực và hệ thống tự phân bổ">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Tên khách hàng</span>
          <input className="input-dark" value={form.customerName} onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))} />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Kênh bán</span>
          <select className="input-dark" value={form.channel} onChange={(event) => setForm((current) => ({ ...current, channel: event.target.value as CreateOrderInput['channel'] }))}>
            {salesChannels.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Sản phẩm</span>
          <select className="input-dark" value={normalizedForm.items[0]?.productId} onChange={(event) => setForm((current) => ({ ...current, items: [{ ...current.items[0], productId: event.target.value }] }))}>
            {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Số lượng</span>
          <input type="number" min={1} className="input-dark" value={normalizedForm.items[0]?.quantity} onChange={(event) => setForm((current) => ({ ...current, items: [{ ...current.items[0], quantity: Number(event.target.value) || 1 }] }))} />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Khu vực khách hàng</span>
          <select className="input-dark" value={form.customerArea} onChange={(event) => setForm((current) => ({ ...current, customerArea: event.target.value as CreateOrderInput['customerArea'] }))}>
            {customerAreas.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Phương thức nhận</span>
          <select className="input-dark" value={form.fulfillmentMode} onChange={(event) => setForm((current) => ({ ...current, fulfillmentMode: event.target.value as CreateOrderInput['fulfillmentMode'] }))}>
            {fulfillmentModes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Thanh toán</span>
          <select className="input-dark" value={form.paymentMethod} onChange={(event) => setForm((current) => ({ ...current, paymentMethod: event.target.value as CreateOrderInput['paymentMethod'] }))}>
            {paymentMethods.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm text-slate-300">Ghi chú</span>
          <textarea className="input-dark min-h-28 resize-none" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={() => onPreview(normalizedForm)}>Chạy Decision Engine</Button>
        <Button variant="secondary" onClick={() => setForm({
          customerName: 'Khách demo logistics',
          customerArea: 'Quận 10',
          channel: 'Website',
          fulfillmentMode: 'Giao tận nơi',
          paymentMethod: 'Đã thanh toán',
          notes: 'Demo đơn ưu tiên tốc độ giao hàng',
          items: [{ productId: firstProductId, quantity: 1 }],
        })}>
          Nạp mẫu nhanh
        </Button>
      </div>
    </Card>
  );
};
