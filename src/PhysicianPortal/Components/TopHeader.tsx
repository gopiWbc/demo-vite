import { useState } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  ChevronDown,
  Menu as MenuIcon,
  X,
} from "lucide-react";

import logo from "@/assets/dark.png";
import AppSidebar from "./AppSidebar";

interface TopHeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function TopHeader({
  currentPage,
  onPageChange,
}: TopHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ================= PROFILE DROPDOWN MENU ================= */
  const profileMenu: MenuProps = {
    items: [
      {
        key: "profile",
        label: (
          <div className="flex items-center gap-3 px-1">
            <span className="text-sm font-medium">My Profile</span>
          </div>
        ),
        onClick: () => onPageChange("profile"),
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        label: (
          <div className="flex items-center gap-3 px-1 text-red-600">
            <span className="text-sm font-semibold">Sign Out</span>
          </div>
        ),
        onClick: () => {
          // TODO: logout handler
        },
      },
    ],
  };

  return (
    <>
      {/* ================= TOP HEADER ================= */}
      <div className="bg-gray-50 sticky top-0 z-50 shadow-sm z-1040">
        <nav className="bg-app-primary">
          <div className="mx-auto md:mx-5 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">

              {/* LEFT SECTION */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  className="rounded-lg p-2 text-white hover:bg-white/10 transition"
                  aria-label="Open sidebar"
                >
                  {drawerOpen ? <X  className="size-7" /> : <MenuIcon className="size-7" />}
                </button>

                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={logo}
                    alt="Primex Logo"
                    className="h-10 sm:h-14 w-auto object-contain"
                  />

                  <div className="hidden sm:flex items-center gap-2 border-l border-white/30 pl-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{
                        background:
                          "linear-gradient(to right, #00c3e8, #05e57e)",
                      }}
                    />
                    <span className="text-sm font-semibold tracking-wide text-white/90 uppercase">
                      Provider Portal
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SECTION – PROFILE */}
              <Dropdown
                menu={profileMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <button className="flex items-center space-x-3 rounded-lg px-3 py-2 hover:bg-white/10 transition">
                  <div className="h-9 w-9 rounded-full bg-white text-app-primary flex items-center justify-center font-bold">
                    JD
                  </div>

                  <div className="hidden sm:block text-left">
                    <p className="text-xs text-white">Welcome,</p>
                    <p className="text-sm font-semibold text-white">
                      John Doe
                    </p>
                  </div>

                  <ChevronDown className="h-4 w-4 text-white" />
                </button>
              </Dropdown>
            </div>
          </div>
        </nav>
      </div>

      {/* ================= SIDEBAR ================= */}
      <AppSidebar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
}
