import { useState } from 'react';
import { User, FileText, Stethoscope, ClipboardList, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import logo from '@/assets/dark.png';
import type { Page } from '../..';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointment' as Page, label: 'Appointments', icon: ClipboardList },
    { id: 'results' as Page, label: 'Results', icon: FileText },
    { id: 'physicians' as Page, label: 'Physicians', icon: Stethoscope },
  ];

  return (
    <div className="bg-gray-50 sticky top-0 z-50 shadow-sm">
      <nav className="bg-app-primary">
        <div className="mx-20 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
                {/* Logo Image */}
                <div className="flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Primex Logo"
                    className="w-55 h-55 object-contain"
                  />
                </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold transition-all  ${
                      currentPage === item.id
                        ? "bg-white text-app-primary shadow-lg rounded-lg"
                        : "text-white hover:scale-110"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:scale-101 hover:bg-opacity-10 transition-all duration-200 "
              >
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-sm font-bold text-app-primary shadow-md">
                  JD
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs  font-semibold text-white">Welcome,</p>
                  <p className="text-sm font-semibold text-white">John Doe</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl overflow-hidden z-20 border border-gray-100">
                    <div className="px-4 py-3 bg-app-primary">
                      <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-lg font-bold text-app-primary shadow-md">
                          JD
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">
                            {" "}
                            John Doe
                          </p>
                          <p className="text-xs text-white mt-0.5">
                            Patient Account
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-150 group"
                        onClick={() => {
                          setDropdownOpen(false);
                          onPageChange("profile");
                        }}
                      >
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-emerald-100 mr-3 transition-colors">
                          <User className="w-4 h-4 text-gray-600 group-hover:text-emerald-600" />
                        </div>
                        <span>Profile</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-100">
                      <button
                        className="flex items-center w-full px-4 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all duration-150 group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 group-hover:bg-red-100 mr-3 transition-colors">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}