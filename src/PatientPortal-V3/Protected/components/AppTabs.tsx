import React from "react";
import clsx from "clsx";

export interface TabItem {
  key: string;
  label: string;
}

interface AppTabsProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

const AppTabs: React.FC<AppTabsProps> = ({ tabs, activeKey, onChange }) => {
  return (
    <div className="border-b border-gray-200">
      {/* Scroll container for mobile */}
      <div className="relative overflow-x-auto custom-scrollbar">
        <div className="flex gap-6 sm:gap-8 px-1 min-w-max">
          {tabs.map((tab) => {
            const isActive = tab.key === activeKey;

            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={clsx(
                  "relative whitespace-nowrap pb-3 transition-colors",
                  // Typography
                  "text-sm sm:text-base lg:text-lg font-semibold",
                  // Colors
                  isActive
                    ? "text-indigo-800"
                    : "text-gray-500 hover:text-indigo-700"
                )}
              >
                {tab.label}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute left-0 -bottom-[1px] h-[3px] w-full rounded-full bg-indigo-800" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppTabs;
