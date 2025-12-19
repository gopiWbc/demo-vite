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
      <div className="relative flex gap-8 px-1">
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;

          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={clsx(
                "relative pb-3 text-lg font-semibold transition-colors",
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
  );
};

export default AppTabs;
