import { Drawer } from "antd";
import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  Stethoscope,
} from "lucide-react";
import logo from "@/assets/dark.png";

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
  const menuItems = [
    {
      key: "dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
    {
      key: "appointment",
      icon: <ClipboardList size={18} />,
      label: "Appointments",
    },
    {
      key: "results",
      icon: <FileText size={18} />,
      label: "Results",
    },
    {
      key: "physicians",
      icon: <Stethoscope size={18} />,
      label: "Physicians",
    },
  ];

  const handleMenuClick = (key: string) => {
    onPageChange(key);
    onClose();
  };

  return (
    <Drawer
      placement="left"
      open={open}
      onClose={onClose}
      width={280}
      closeIcon={<span className="text-white">✕</span>}
      classNames={{
        header: "border-none bg-gray-100",
        body: "!p-0 bg-gray-100",
      }}
      title={
        <img
          src={logo}
          alt="Primex Logo"
          className="h-12 w-auto object-contain"
        />
      }
    >
      {/* Navigation Menu */}
      <div className="py-2">
        {menuItems.map((item) => {
          const isActive = currentPage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all border-l-4 hover:scale-105 ${
                isActive
                  ? "bg-white border-l-indigo-600 text-gray-900 ml-2 scale-105"
                  : "bg-gray-100 border-l-transparent text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className={isActive ? "text-indigo-600" : "text-gray-600"}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </Drawer>
  );
}