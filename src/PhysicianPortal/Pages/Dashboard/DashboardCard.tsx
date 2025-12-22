import React from "react";
import { Dropdown, Select, Tooltip } from "antd";
import {
  GripHorizontal,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  Ellipsis,
  EyeOff,
} from "lucide-react";
import type { CardConfig } from "./cardConfig";

interface DashboardCardProps {
  card: CardConfig;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onMoveToFirst: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveToLast: () => void;
  onHide: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  card,
  onDragStart,
  onMoveToFirst,
  onMoveUp,
  onMoveDown,
  onMoveToLast,
  onHide,
}) => {
  const Icon = card.icon;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="
        cursor-pointer
        group relative flex flex-col
        rounded-2xl border border-slate-200
        bg-white
        transition-all duration-200
        hover:shadow-lg hover:border-indigo-300
        h-full
      "
    >
      {/* Drag Handle (TOP) */}
      <div className="flex items-center justify-center py-2 border-b border-slate-100 cursor-grab active:cursor-grabbing">
        <GripHorizontal className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition" />
      </div>

      {/* Card Header */}
      <div className="flex items-start justify-between px-5 pt-4">
        <h3 className="text-md font-bold text-indigo-700 leading-snug">
          {card.title}
        </h3>

        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          menu={{
            items: [
              { key: "first", label: "Move to top", icon: <ChevronsUp size={14} /> },
              { key: "up", label: "Move up", icon: <ArrowUp size={14} /> },
              { key: "down", label: "Move down", icon: <ArrowDown size={14} /> },
              { key: "last", label: "Move to bottom", icon: <ChevronsDown size={14} /> },
              { type: "divider" },
              { key: "hide", label: "Hide card", icon: <EyeOff size={14} />, danger: true },
            ],
            onClick: ({ key }) => {
              if (key === "first") onMoveToFirst();
              if (key === "up") onMoveUp();
              if (key === "down") onMoveDown();
              if (key === "last") onMoveToLast();
              if (key === "hide") onHide();
            },
          }}
        >
          <button className="rounded-md p-1 hover:bg-slate-100 transition">
            <Ellipsis className="!text-slate-500 size-5" />
          </button>
        </Dropdown>
      </div>

      {/* Icon Section */}
      <div className="flex flex-1 items-baseline justify-center py-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
          <Icon size={36} />
        </div>
      </div>

     {card.selectOptions && (
  <div className="px-5 pb-3">
    <Dropdown
      trigger={["click"]}
      placement="bottomLeft"
      menu={{
        items: card.selectOptions.map((opt) => ({
          key: opt.value,
          label: opt.label,
        })),
        onClick: ({ key }) => {
          console.log("Selected option:", key);
        },
      }}
    >
      <button
        className="
          w-full flex items-center justify-between
          rounded-lg border border-slate-200
          px-3 py-2
          text-sm font-medium text-slate-600
          hover:border-indigo-300 hover:text-indigo-600
          transition
        "
      >
        <span>Select</span>
        <span className="text-xs text-slate-400">▼</span>
      </button>
    </Dropdown>
  </div>
)}

      {/* Bottom Action Bar (Always Visible) */}
      {/* <div className="mt-auto flex items-center justify-center gap-4 border-t border-slate-100 py-3">
        <Tooltip title="Move to top">
          <button onClick={onMoveToFirst} className="icon-btn">
            <ChevronsUp size={16} />
          </button>
        </Tooltip>

        <Tooltip title="Move up">
          <button onClick={onMoveUp} className="icon-btn">
            <ArrowUp size={16} />
          </button>
        </Tooltip>

        <Tooltip title="Move down">
          <button onClick={onMoveDown} className="icon-btn">
            <ArrowDown size={16} />
          </button>
        </Tooltip>

        <Tooltip title="Move to bottom">
          <button onClick={onMoveToLast} className="icon-btn">
            <ChevronsDown size={16} />
          </button>
        </Tooltip>

        <Tooltip title="Hide card">
          <button onClick={onHide} className="icon-btn text-red-500">
            <EyeOff size={16} />
          </button>
        </Tooltip>
      </div> */}
    </div>
  );
};

export default DashboardCard;
