import { useMemo, useState } from "react";
import { Button } from "antd";
import { Eye } from "lucide-react";

import AppTabs from "../../../PatientPortal-V3/Protected/components/AppTabs";
import AppTable from "../../Components/AppTable";
import SupplyOrderFilterComponent from "./SupplyOrderFilterComponent";
import SupplyOrderCreate from "./SupplyOrderCreate";
import SupplyOrderView from "./SupplyOrderView";
import type { SupplyOrderFilters, SupplyOrderRecord } from "./types";

const baseSupplyItems = {
  standardKit: {
    id: "kit-std",
    code: "KIT-STD",
    name: "Standard Collection Kit",
    category: "Kits",
    description: "Comprehensive phlebotomy kit with tubes and swabs.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=160&q=80",
  },
  urineContainer: {
    id: "cnt-ur",
    code: "CNT-UR",
    name: "Urine Container 50ml",
    category: "Containers",
    description: "Sterile 50ml containers sealed for transport.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=160&q=80",
  },
  fluSwab: {
    id: "kit-flu",
    code: "KIT-FLU",
    name: "Influenza Nasal Swab Kit",
    category: "Swabs",
    description: "Soft-tipped nasal swabs with transport media.",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=160&q=80",
  },
  bloodSet: {
    id: "kit-bld",
    code: "KIT-BLD",
    name: "Blood Collection Set",
    category: "Kits",
    description: "Butterfly needles, tubes, and holders for draws.",
    image: "https://images.unsplash.com/photo-1581391492920-44d612196ad6?auto=format&fit=crop&w=160&q=80",
  },
};

const buildOrder = (config: {
  id: string;
  clientId: string;
  orderDate: string;
  orderedBy: string;
  supplies: { item: keyof typeof baseSupplyItems; quantity: number }[];
  notes: string;
}): SupplyOrderRecord => ({
  id: config.id,
  clientId: config.clientId,
  orderDate: config.orderDate,
  orderedBy: config.orderedBy,
  supplies: config.supplies.map(({ item, quantity }) => ({
    ...baseSupplyItems[item],
    quantity,
  })),
  notes: config.notes,
});

const mockSupplyOrders: SupplyOrderRecord[] = [
  buildOrder({
    id: "1",
    clientId: "City Medical Center",
    orderDate: "03/14/2025",
    orderedBy: "Ajith",
    supplies: [
      { item: "standardKit", quantity: 24 },
      { item: "urineContainer", quantity: 36 },
      { item: "fluSwab", quantity: 18 },
    ],
    notes: "Prep for quarterly wellness fair. Kits needed on-site by Friday.",
  }),
  buildOrder({
    id: "2",
    clientId: "Evergreen Clinic",
    orderDate: "03/14/2025",
    orderedBy: "Ajith",
    supplies: [
      { item: "standardKit", quantity: 12 },
      { item: "bloodSet", quantity: 10 },
    ],
    notes: "Restock following community screening event.",
  }),
  buildOrder({
    id: "3",
    clientId: "CT0012",
    orderDate: "04/01/2023",
    orderedBy: "Angelina",
    supplies: [
      { item: "urineContainer", quantity: 40 },
      { item: "fluSwab", quantity: 16 },
    ],
    notes: "Keep refrigerated packs ready for courier pickup.",
  }),
  buildOrder({
    id: "4",
    clientId: "Free123",
    orderDate: "04/01/2023",
    orderedBy: "Preethi",
    supplies: [
      { item: "standardKit", quantity: 30 },
    ],
    notes: "Urgent request—clinic opening new draw station.",
  }),
  buildOrder({
    id: "5",
    clientId: "Wbctester",
    orderDate: "04/01/2023",
    orderedBy: "Veeralakshmi",
    supplies: [
      { item: "standardKit", quantity: 20 },
      { item: "fluSwab", quantity: 10 },
    ],
    notes: "Include updated instructions in each kit.",
  }),
  buildOrder({
    id: "6",
    clientId: "Wbctester123",
    orderDate: "04/01/2023",
    orderedBy: "Ajith",
    supplies: [
      { item: "bloodSet", quantity: 22 },
      { item: "urineContainer", quantity: 28 },
    ],
    notes: "Routine monthly restock.",
  }),
  buildOrder({
    id: "7",
    clientId: "CLD12",
    orderDate: "11/16/2020",
    orderedBy: "Anjali",
    supplies: [
      { item: "standardKit", quantity: 18 },
    ],
    notes: "Send with temperature monitors.",
  }),
  buildOrder({
    id: "8",
    clientId: "030620",
    orderDate: "11/16/2020",
    orderedBy: "Benny",
    supplies: [
      { item: "urineContainer", quantity: 32 },
    ],
    notes: "Label boxes for PSC location.",
  }),
  buildOrder({
    id: "9",
    clientId: "KL90",
    orderDate: "11/13/2020",
    orderedBy: "Testing",
    supplies: [
      { item: "fluSwab", quantity: 25 },
    ],
    notes: "Ship with standard cold-chain packaging.",
  }),
  buildOrder({
    id: "10",
    clientId: "565656",
    orderDate: "11/13/2020",
    orderedBy: "ASAS",
    supplies: [
      { item: "standardKit", quantity: 14 },
      { item: "bloodSet", quantity: 10 },
    ],
    notes: "Include printed standing order summary.",
  }),
  buildOrder({
    id: "11",
    clientId: "565656",
    orderDate: "11/13/2020",
    orderedBy: "Asas",
    supplies: [
      { item: "standardKit", quantity: 16 },
    ],
    notes: "Deliver before noon if possible.",
  }),
  buildOrder({
    id: "12",
    clientId: "200",
    orderDate: "11/13/2020",
    orderedBy: "Testing",
    supplies: [
      { item: "urineContainer", quantity: 18 },
      { item: "fluSwab", quantity: 12 },
    ],
    notes: "Add fragile labels to exterior boxes.",
  }),
  buildOrder({
    id: "13",
    clientId: "135",
    orderDate: "11/13/2020",
    orderedBy: "Testing",
    supplies: [
      { item: "bloodSet", quantity: 20 },
    ],
    notes: "Return signed delivery receipt via email.",
  }),
  buildOrder({
    id: "14",
    clientId: "KL90",
    orderDate: "11/11/2020",
    orderedBy: "Vinoth",
    supplies: [
      { item: "standardKit", quantity: 28 },
    ],
    notes: "Coordinate drop-off with lab manager on duty.",
  }),
];

const initialFilters: SupplyOrderFilters = {
  clientId: "",
  orderDateRange: [null, null],
};

const tabs = [
  { key: "view-supply-orders", label: "View Supply Orders" },
  { key: "request-supply-order", label: "New Supply Order" },
];

const SupplyOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("view-supply-orders");
  const [filters, setFilters] = useState<SupplyOrderFilters>(initialFilters);
  const [selectedOrder, setSelectedOrder] = useState<SupplyOrderRecord | null>(null);

  const filteredOrders = useMemo(() => {
    return mockSupplyOrders.filter((record) => {
      const clientMatch = filters.clientId
        ? record.clientId.toLowerCase().includes(filters.clientId.toLowerCase())
        : true;

      const [start, end] = filters.orderDateRange;
      let orderMatch = true;
      if (start) {
        orderMatch = orderMatch && new Date(record.orderDate) >= new Date(start);
      }
      if (end) {
        orderMatch = orderMatch && new Date(record.orderDate) <= new Date(end);
      }
      return clientMatch && orderMatch;
    });
  }, [filters]);

  const handleSearch = () => {
    // eslint-disable-next-line no-console
    console.log("Searching supply orders", filters);
  };

  const handleClearAll = () => setFilters(initialFilters);

  const columns = [
    {
      title: "Client ID",
      dataIndex: "clientId",
      key: "clientId",
    },
    {
      title: "Order date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Ordered by",
      dataIndex: "orderedBy",
      key: "orderedBy",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right" as const,
      width: 100,
      render: (_: unknown, record: SupplyOrderRecord) => (
        <Button
          type="text"
          size="small"
          icon={<Eye className="h-4 w-4" />}
          className="text-indigo-600 hover:text-indigo-700"
          onClick={() => setSelectedOrder(record)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-2 pb-10">
      <AppTabs
        tabs={tabs}
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          if (key === "view-supply-orders") {
            setSelectedOrder(null);
          }
        }}
      />

      {activeTab === "request-supply-order" ? (
        <div className="pt-6">
          <SupplyOrderCreate />
        </div>
      ) : selectedOrder ? (
        <div className="pt-6">
          <SupplyOrderView order={selectedOrder} onBack={() => setSelectedOrder(null)} />
        </div>
      ) : (
        <div className="space-y-6 pt-6">
          <SupplyOrderFilterComponent
            filters={filters}
            onFilterChange={setFilters}
            onSearch={handleSearch}
            onClearAll={handleClearAll}
          />

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <AppTable
              columns={columns}
              data={filteredOrders}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50"],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplyOrdersPage;
