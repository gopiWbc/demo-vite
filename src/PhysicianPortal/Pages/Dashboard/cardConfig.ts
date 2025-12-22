import {
  Users,
  UserCheck,
  FilePlus,
  ShoppingCart,
  Settings2,
  ShieldCheck,
  Truck,
  CreditCard,
  Phone,
  Building2,
  SlidersHorizontal,
  UserCog,
  ClockAlert,
  PackageCheck,
  MessageSquare,
  FileBarChart,
  Layers2,
} from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface CardConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ size: number }>;
  selectOptions?: SelectOption[];
  order: number;
  hidden: boolean;
}

export const CARD_OPTIONS: CardConfig[] = [
//     {
//     id: "dashboard",
//     title: "Dashboard",
//     icon: Layers2,
//     order: 0,
//     hidden: false,
//   },

  {
    id: "patient",
    title: "Patient",
    icon: Users,
    order: 1,
    hidden: false,
    selectOptions: [
      { value: "new-patient", label: "New Patient" },
      { value: "patient-list", label: "Patient List" },
      { value: "patient-notification", label: "Patient Notification" },
    ],
  },

  {
    id: "results",
    title: "Results",
    icon: FilePlus,
    order: 2,
    hidden: false,
  },

  {
    id: "orders",
    title: "Orders",
    icon: ShoppingCart,
    order: 4,
    hidden: false,
    selectOptions: [
      { value: "orders", label: "Orders" },
      { value: "psc-hold", label: "PSC Hold" },
    ],
  },

  {
    id: "users",
    title: "Users",
    icon: UserCog,
    order: 5,
    hidden: false,
  },

  {
    id: "physicians",
    title: "Physicians",
    icon: UserCheck,
    order: 6,
    hidden: false,
  },

  {
    id: "clients",
    title: "Clients",
    icon: Building2,
    order: 7,
    hidden: false,
  },

  {
    id: "configuration",
    title: "Configuration",
    icon: SlidersHorizontal,
    order: 8,
    hidden: false,
  },

  {
    id: "pending-requests",
    title: "Pending Requests",
    icon: ClockAlert,
    order: 9,
    hidden: false,
  },

  {
    id: "security",
    title: "Security",
    icon: ShieldCheck,
    order: 10,
    hidden: false,
  },

  {
    id: "manage",
    title: "Manage",
    icon: Settings2,
    order: 11,
    hidden: false,
    selectOptions: [
      { value: "icd-code", label: "ICD Code" },
      { value: "custom-panels", label: "Custom Panels" },
      { value: "test-panel-codes", label: "Test / Panel Codes" },
      { value: "dictionary", label: "Dictionary" },
      { value: "sales-log", label: "Sales Log" },
      { value: "import-patients", label: "Import Patients" },
      { value: "import-clients", label: "Import Clients" },
      { value: "user-logs", label: "User Logs" },
      { value: "ipa-patients-import", label: "IPA Patients Import" },
      { value: "ipa-client-routing", label: "IPA Client Routing" },
      { value: "ipa-patient-routing", label: "IPA Patient Routing" },
    ],
  },

  {
    id: "supply-order-masters",
    title: "Supply Order Masters",
    icon: PackageCheck,
    order: 12,
    hidden: false,
  },

  {
    id: "supply-orders",
    title: "Supply Orders",
    icon: Truck,
    order: 13,
    hidden: false,
  },

  {
    id: "messages",
    title: "Messages",
    icon: MessageSquare,
    order: 14,
    hidden: false,
  },

  {
    id: "transactions",
    title: "Transactions",
    icon: CreditCard,
    order: 15,
    hidden: false,
  },

  {
    id: "sales-report",
    title: "Sales Report",
    icon: FileBarChart,
    order: 16,
    hidden: false,
  },

  {
    id: "contact-us",
    title: "Contact Us",
    icon: Phone,
    order: 17,
    hidden: false,
  },
];
