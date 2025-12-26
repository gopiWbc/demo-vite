import { Drawer } from "antd";
import {
  ChevronDown,
  Users,
  ShoppingCart,
  Package,
  Mail,
  CreditCard,
  BarChart3,
  Settings,
  FileText,
  Layers2,
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/dark.png";

const BRAND = "#200e3d";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function AppSidebar({
  open,
  onClose,
  currentPage,
  onPageChange,
}: SidebarProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);

 const items = [
  { key: "dashboard", label: "Dashboard", icon: Layers2 },

  { key: "result-list", label: "Results", icon: FileText },

  {
    key: "patient",
    label: "Patient",
    icon: Users,
  },

  {
    key: "orders",
    label: "Orders",
    icon: ShoppingCart,
  },

  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      { key: "users", label: "Users" },
      { key: "physicians", label: "Physicians" },
      { key: "clients", label: "Clients" },
      { key: "configuration", label: "Configuration" },
      { key: "pending-requests", label: "Pending Requests" },
      // { key: "security", label: "Security" },
    ],
  },

  {
    key: "manage",
    label: "Manage",
    icon: Users,
    children: [
      { key: "icd-code", label: "ICD Code" },
      { key: "custom-panels", label: "Custom Panels" },
      { key: "test/panel-codes", label: "Test/Panel Codes" },
      { key: "dictionary", label: "Dictionary" },
      { key: "sales-log", label: "Sales Log" },
      // { key: "import-patients", label: "Import Patients" },
      // { key: "import-clients", label: "Import Clients" },
      { key: "user-logs", label: "User Logs" },
      // { key: "ipa-patients-import", label: "IPA Patients Import" },
      { key: "ipa-client-routing", label: "IPA Client Routing" },
      { key: "ipa-patient-routing", label: "IPA Patient Routing" },
    ],
  },

  { key: "supply-masters", label: "Supply Order Masters", icon: Package },
  { key: "supply-orders", label: "Supply Orders", icon: Package },
  { key: "messages", label: "Messages", icon: Mail },
  { key: "transactions", label: "Transactions", icon: CreditCard },
  { key: "sales-report", label: "Sales Report", icon: BarChart3 },
  // { key: "contact", label: "Contact Us", icon: Phone },
];

  return (
    <Drawer
      placement="left"
      open={open}
      onClose={onClose}
      width={300}
      closeIcon={false}
      classNames={{
        header: "border-none bg-gray-100",
        body: "!p-0 bg-gray-100",
      }}
      title={<img src={logo} className="h-10 mx-auto" />}
    >
      <nav className="px-3 py-4 text-sm text-gray-800">
        {items.map((item) => {
          const isOpen = openKey === item.key;
          const isActive = currentPage === item.key;
          const Icon = item.icon;

          /* ---------- SIMPLE ITEM ---------- */
          if (!item.children) {
            return (
              <button
                key={item.key}
                onClick={() => onPageChange(item.key)}
                className={`group relative w-full mb-1 rounded-lg px-4 py-2.5 text-left
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-white shadow-sm scale-[1.03]"
                      : "hover:bg-white hover:shadow-sm hover:scale-[1.03]"
                  }`}
              >
                {/* Active / Hover rail */}
                <span
                  className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r"
                  style={{ backgroundColor: isActive ? BRAND : "transparent" }}
                />

                <div className="flex items-center gap-3">
                  {Icon && (
                    <Icon
                      size={16}
                      style={{ color: isActive ? BRAND : "#6b7280" }}
                    />
                  )}
                  <span
                    className="font-medium"
                    style={{ color: isActive ? BRAND : "#1f2937" }}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          }

          /* ---------- ACCORDION ITEM ---------- */
          return (
            <div key={item.key} className="mb-1">
              <button
                onClick={() =>
                  setOpenKey(isOpen ? null : item.key)
                }
                className="group relative w-full rounded-lg px-4 py-2 flex items-center justify-between
                  transition-all duration-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {Icon && (
                    <Icon
                      size={16}
                      style={{ color: isOpen ? BRAND : "#6b7280" }}
                    />
                  )}
                  <span
                    className="font-medium"
                    style={{ color: isOpen ? BRAND : "#1f2937" }}
                  >
                    {item.label}
                  </span>
                </div>

                <ChevronDown
                  size={16}
                  className="transition-transform duration-300"
                  style={{
                    color: BRAND,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* ---------- ANIMATED SUB MENU ---------- */}
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                  relative ml-6 mt-1 pl-4`}
              >
                <div className="min-h-0">
                  {/* Connector spine */}
                  <span
                    className="absolute left-2 top-0 bottom-0 w-[1.5px]"
                    style={{ backgroundColor: BRAND }}
                  />

                  <div className="space-y-1">
                    {item.children.map((child: any) => {
                      const active = currentPage === child.key;

                      return (
                        <button
                          key={child.key}
                          onClick={() => onPageChange(child.key)}
                          className={`group relative w-full rounded-md px-4 py-2 text-left
                            transition-all duration-200
                            ${
                              active
                                ? "bg-white shadow-sm"
                                : "hover:bg-white hover:shadow-sm"
                            }`}
                        >
                          <div
                            className="ml-3"
                            style={{ color: active ? BRAND : "#374151" }}
                          >
                            {child.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </Drawer>
  );
}
