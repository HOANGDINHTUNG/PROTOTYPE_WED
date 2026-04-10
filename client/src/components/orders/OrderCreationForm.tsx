import { useMemo, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import {
  customerAreas,
  fulfillmentModes,
  paymentMethods,
  salesChannels,
} from "../../constants/domain";
import type { CreateOrderInput, Product } from "../../types";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

interface OrderCreationFormProps {
  products: Product[];
  onPreview: (input: CreateOrderInput) => void;
}

const defaultProductId = "";

export const OrderCreationForm = ({
  products,
  onPreview,
}: OrderCreationFormProps) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<CreateOrderInput>(() => ({
    customerName: t("create_order.form.default_name"),
    customerArea: "Quận 10",
    channel: "Shopee",
    fulfillmentMode: "Giao tận nơi",
    paymentMethod: "COD",
    notes: t("create_order.form.default_notes"),
    items: [{ productId: defaultProductId, quantity: 1 }],
  }));

  // Re-sync basic default strings if language changes without resetting form
  const [prevLanguage, setPrevLanguage] = useState(i18next.language || "vi");

  if (i18next.language !== prevLanguage) {
    setPrevLanguage(i18next.language);

    // Only update if current value is the default from PREVIOUS language
    const oldDefaultName = t("create_order.form.default_name", {
      lng: prevLanguage,
    });
    const oldDefaultNotes = t("create_order.form.default_notes", {
      lng: prevLanguage,
    });

    if (
      !form.customerName ||
      form.customerName === oldDefaultName ||
      form.notes === oldDefaultNotes
    ) {
      setForm((prev) => ({
        ...prev,
        customerName:
          !prev.customerName || prev.customerName === oldDefaultName
            ? t("create_order.form.default_name")
            : prev.customerName,
        notes:
          prev.notes === oldDefaultNotes
            ? t("create_order.form.default_notes")
            : prev.notes,
      }));
    }
  }

  const firstProductId = useMemo(() => products[0]?.id ?? "", [products]);

  const normalizedForm = useMemo<CreateOrderInput>(
    () => ({
      ...form,
      items: [
        {
          productId: form.items[0]?.productId || firstProductId,
          quantity: form.items[0]?.quantity || 1,
        },
      ],
    }),
    [firstProductId, form],
  );

  return (
    <Card
      title={t("create_order.form.title")}
      subtitle={t("create_order.form.subtitle")}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-slate-600 font-medium">
            {t("create_order.form.customer_name")}
          </span>
          <input
            className="input-premium"
            value={form.customerName}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                customerName: event.target.value,
              }))
            }
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-600 font-medium">
            {t("create_order.form.channel")}
          </span>
          <select
            className="input-premium"
            value={form.channel}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                channel: event.target.value as CreateOrderInput["channel"],
              }))
            }
          >
            {salesChannels.map((option) => (
              <option key={option.value} value={option.value}>
                {t(`domain.channels.${option.value}`, {
                  defaultValue: option.label,
                })}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-600 font-medium">
            {t("create_order.form.product")}
          </span>
          <select
            className="input-premium"
            value={normalizedForm.items[0]?.productId}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                items: [
                  {
                    productId: event.target.value,
                    quantity: current.items[0]?.quantity || 1,
                  },
                ],
              }))
            }
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-600 font-medium">
            {t("create_order.form.quantity")}
          </span>
          <input
            type="number"
            min={1}
            className="input-premium"
            value={normalizedForm.items[0]?.quantity}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                items: [
                  {
                    productId: current.items[0]?.productId || firstProductId,
                    quantity: Number(event.target.value) || 1,
                  },
                ],
              }))
            }
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-600 font-medium">
            {t("create_order.form.area")}
          </span>
          <select
            className="input-premium"
            value={form.customerArea}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                customerArea: event.target
                  .value as CreateOrderInput["customerArea"],
              }))
            }
          >
            {customerAreas.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-600 font-medium">
            {t("create_order.form.fulfillment_mode")}
          </span>
          <select
            className="input-premium"
            value={form.fulfillmentMode}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                fulfillmentMode: event.target
                  .value as CreateOrderInput["fulfillmentMode"],
              }))
            }
          >
            {fulfillmentModes.map((option) => (
              <option key={option.value} value={option.value}>
                {t(`domain.fulfillment.${option.value}`, {
                  defaultValue: option.label,
                })}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm text-slate-600 font-medium">
            {t("create_order.form.payment")}
          </span>
          <select
            className="input-premium"
            value={form.paymentMethod}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                paymentMethod: event.target
                  .value as CreateOrderInput["paymentMethod"],
              }))
            }
          >
            {paymentMethods.map((option) => (
              <option key={option.value} value={option.value}>
                {t(`domain.payment.${option.value}`, {
                  defaultValue: option.label,
                })}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm text-slate-600 font-medium">
            {t("create_order.form.notes")}
          </span>
          <textarea
            className="input-dark min-h-28 resize-none"
            value={form.notes}
            onChange={(event) =>
              setForm((current) => ({ ...current, notes: event.target.value }))
            }
          />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={() => onPreview(normalizedForm)}>
          {t("create_order.form.run_btn")}
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            setForm({
              customerName: t("create_order.form.default_name_priority"),
              customerArea: "Quận 10",
              channel: "Website",
              fulfillmentMode: "Giao tận nơi",
              paymentMethod: "Đã thanh toán",
              notes: t("create_order.form.default_notes_priority"),
              items: [{ productId: firstProductId, quantity: 1 }],
            })
          }
        >
          {t("create_order.form.load_btn")}
        </Button>
      </div>
    </Card>
  );
};
