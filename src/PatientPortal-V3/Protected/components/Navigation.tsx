import { useState } from 'react';
import { User, FileText, Stethoscope, ClipboardList, ChevronDown, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import logo from '@/assets/dark.png';
import type { Page } from '../..';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointment' as Page, label: 'Appointments', icon: ClipboardList },
    { id: 'results' as Page, label: 'Results', icon: FileText },
    { id: 'physicians' as Page, label: 'Physicians', icon: Stethoscope },
  ];

  return (
    <div className="bg-gray-50 sticky top-0 z-50 shadow-sm">
      <nav className="bg-app-primary">
        <div className="mx-auto md:mx-20 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white lg:hidden"
                aria-label="Toggle navigation"
                onClick={() => setMobileMenuOpen(prev => !prev)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Primex Logo"
                  className="h-10 w-auto object-contain sm:h-14"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold transition-all ${
                      currentPage === item.id
                        ? 'bg-white text-app-primary shadow-lg rounded-lg'
                        : 'text-white hover:scale-105'
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
                className="flex items-center space-x-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/10"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-app-primary shadow-md">
                  JD
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-semibold text-white">Welcome,</p>
                  <p className="text-sm font-semibold text-white">John Doe</p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-white transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
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
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl z-20">
                    <div className="bg-app-primary px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-bold text-app-primary shadow-md">
                          JD
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">John Doe</p>
                          <p className="mt-0.5 text-xs text-white">Patient Account</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        className="group flex w-full items-center px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-150 hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => {
                          setDropdownOpen(false);
                          onPageChange('profile');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-emerald-100">
                          <User className="h-4 w-4 text-gray-600 group-hover:text-emerald-600" />
                        </div>
                        <span>Profile</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-100">
                      <button
                        className="group flex w-full items-center px-4 py-3.5 text-sm font-semibold text-red-600 transition-all duration-150 hover:bg-red-50"
                        onClick={() => {
                          setDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 transition-colors group-hover:bg-red-100">
                          <LogOut className="h-4 w-4 text-red-600" />
                        </div>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="border-t border-white/10 pb-4 pt-3 lg:hidden">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onPageChange(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                        currentPage === item.id
                          ? 'bg-white text-app-primary shadow-md'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${currentPage === item.id ? 'rotate-180' : ''}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}