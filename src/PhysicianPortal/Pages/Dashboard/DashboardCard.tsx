import React from "react";
import { Dropdown, Select } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
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

  const menuItems = [
    { key: "first", label: "Move Card to First" },
    { key: "up", label: "Move Card Up" },
    { key: "down", label: "Move Card Down" },
    { key: "last", label: "Move Card to Last" },
    { type: "divider" as const },
    { key: "delete", label: "Hide", danger: true },
  ];

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="
        relative flex flex-col
        rounded-xl border border-gray-300
        bg-white p-5
        cursor-move
        transition
        hover:border-gray-400
        h-full
      "
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <h3 className="text-md font-semibold text-blue-600 leading-snug">
          {card.title}
        </h3>

        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          menu={{
            items: menuItems,
            onClick: ({ key }) => {
              if (key === "first") onMoveToFirst();
              if (key === "up") onMoveUp();
              if (key === "down") onMoveDown();
              if (key === "last") onMoveToLast();
              if (key === "delete") onHide();
            },
          }}
        >
          <button className="rounded-md p-1 hover:bg-gray-100">
            <EllipsisOutlined className="text-lg text-blue-600" />
          </button>
        </Dropdown>
      </div>

      {/* Icon */}
      <div className="flex flex-1 items-baseline justify-center">
        <Icon
          size={64}
        />
      </div>

      {/* Optional Select */}
      {card.selectOptions && (
        <div className="mt-6">
          <Select
            placeholder="Select"
            size="large"
            className="w-full"
            options={card.selectOptions}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
