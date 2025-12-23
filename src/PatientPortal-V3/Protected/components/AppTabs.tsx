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
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto scroll-smooth no-scrollbar">
        <div className="flex gap-5 sm:gap-8 px-3 min-w-max snap-x snap-mandatory">
          {tabs.map((tab) => {
            const isActive = tab.key === activeKey;

            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={clsx(
                  "relative snap-start whitespace-nowrap",
                  "py-3 px-1",
                  "text-sm sm:text-base lg:text-lg font-semibold",
                  isActive
                    ? "text-indigo-800"
                    : "text-gray-500 hover:text-indigo-700",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                )}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute left-0 bottom-0 h-[3px] w-full rounded-full bg-indigo-800" />
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
