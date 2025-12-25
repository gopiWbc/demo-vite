import { Button, Card, Tag } from "antd";
import { ArrowLeft, CalendarDays, ClipboardList, Layers, Package, Printer, ShoppingBag, User } from "lucide-react";

import type { SupplyOrderRecord } from "./types";

type SupplyOrderViewProps = {
  order: SupplyOrderRecord;
  onBack: () => void;
};

const SupplyOrderView = ({ order, onBack }: SupplyOrderViewProps) => {
  const supplies = order.supplies ?? [];
  const noteContent = order.notes?.trim() ? order.notes : "No additional notes provided.";
  const totalUnits = supplies.reduce((acc, item) => acc + item.quantity, 0);
  const uniqueCategories = new Set(supplies.map((item) => item.category)).size;
  const heroDetails = [
    {
      label: "Ordered By",
      value: order.orderedBy,
      icon: User,
    },
    {
      label: "Client",
      value: order.clientId,
      icon: ClipboardList,
    },
    {
      label: "Order Date",
      value: order.orderDate,
      icon: CalendarDays,
    },
    {
      label: "Total Units",
      value: totalUnits,
      icon: Package,
    },
    {
      label: "Categories",
      value: uniqueCategories,
      icon: Layers,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white/60 p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Back to orders
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Supply Order #{order.id}</h1>
            <p className="text-sm text-gray-500">
              Placed for <span className="font-medium text-gray-700">{order.clientId}</span> on {order.orderDate}.
            </p>
          </div>
          <Button
            type="primary"
            icon={<Printer className="h-4 w-4" />}
            className="btn-primary rounded-lg px-5"
            onClick={() => window.print()}
          >
            Print Order
          </Button>
        </div>
        <div className="mt-4 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {heroDetails.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-3 text-sm text-indigo-700"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-indigo-500">{label}</p>
                <p className="truncate text-sm font-semibold text-indigo-900">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <div className="mb-4 flex flex-col gap-1">
          <h3 className="text-base font-semibold text-gray-900">Ordered Supplies</h3>
        </div>
        {supplies.length ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {supplies.map((item) => (
              <div
                key={item.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
              >
                <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                    #{item.code}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex items-center justify-between">
                    <Tag className="rounded-full border-none bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {item.category}
                    </Tag>
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                      <ShoppingBag className="h-3 w-3" />
                      Qty {item.quantity}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
            No supplies were added to this order.
          </div>
        )}
      </Card>

      <Card className="border border-gray-200 shadow-sm md:w-1/2 !mt-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-gray-900">Order Notes</h3>
          </div>
          <p className="rounded-2xl border border-dashed border-indigo-100 bg-indigo-50/60 p-4 text-sm leading-relaxed text-gray-700">
            {noteContent}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SupplyOrderView;
