import React, { useState, useEffect } from "react";
import { Modal, Checkbox, Button } from "antd";
import type { CardConfig } from "./cardConfig";
import { GripVertical } from "lucide-react";

interface CustomizeModalProps {
  visible: boolean;
  cards: CardConfig[];
  onClose: () => void;
  onSave: (cards: CardConfig[]) => void;
}

const CustomizeModal: React.FC<CustomizeModalProps> = ({
  visible,
  cards,
  onClose,
  onSave,
}) => {
  const [localCards, setLocalCards] = useState<CardConfig[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setLocalCards(cards);
  }, [cards]);

  // Color gradient mapping for each card
  const colorGradients = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-green-500 to-green-600",
    "from-orange-500 to-orange-600",
    "from-red-500 to-red-600",
    "from-teal-500 to-teal-600",
    "from-indigo-500 to-indigo-600",
    "from-pink-500 to-pink-600",
    "from-yellow-500 to-yellow-600",
    "from-cyan-500 to-cyan-600",
    "from-violet-500 to-violet-600",
    "from-emerald-500 to-emerald-600",
    "from-lime-500 to-lime-600",
    "from-rose-500 to-rose-600",
    "from-amber-500 to-amber-600",
    "from-fuchsia-500 to-fuchsia-600",
    "from-sky-500 to-sky-600",
  ];

  const handleToggle = (id: string) => {
    setLocalCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, hidden: !card.hidden } : card
      )
    );
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === index) return;

    setLocalCards((prev) => {
      const updated = [...prev];
      const draggedItem = updated[draggedIndex];

      updated.splice(draggedIndex, 1);
      updated.splice(index, 0, draggedItem);

      return updated.map((c, i) => ({ ...c, order: i }));
    });

    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = () => {
    onSave(localCards);
    onClose();
  };

  return (
    <Modal
      title="Shortcut Configuration"
      classNames={{
        container: "!p-0 [&_.ant-modal-close]:!text-white",
        header: "bg-app-primary !p-4",
        title: "!text-white",
        body: "!px-4",
        footer: "!px-4 !pb-4",
      }}
      open={visible}
      onCancel={onClose}
      width={720}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          size="large"
          className="!rounded-lg !font-medium"
        >
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          size="large"
          className="!rounded-lg !font-medium btn-primary border-none hover:shadow-lg"
        >
          Save
        </Button>,
      ]}
    >
      <p className="text-slate-600 mb-6 text-sm">
        Drag and drop rows to reorder. Use the checkbox to show or hide
        shortcuts.
      </p>

      <div className="max-h-[65vh] overflow-y-auto custom-scrollbar space-y-3">
        {localCards.map((card, index) => {
          const Icon = card.icon;
          const gradient =
            colorGradients[card.title.length % colorGradients.length];
          const optionsCount = card.selectOptions?.length || 0;

          return (
            <div
              key={card.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center gap-4 p-4
                bg-white rounded-xl border-2 border-slate-200
                transition-all duration-150
                cursor-grab active:cursor-grabbing
                hover:border-indigo-300 hover:shadow-md

                ${
                  draggedIndex === index
                    ? "opacity-60 scale-[0.98]"
                    : "opacity-100"
                }
                ${card.hidden ? "bg-slate-50" : ""}
              `}
            >
              {/* Drag Handle */}
              <div className="flex-shrink-0">
                <GripVertical className="text-slate-400" />
              </div>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient}
                flex items-center justify-center shadow-md`}
              >
                <span className="text-white">
                  <Icon size={24} />
                </span>
              </div>

              {/* Title */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 truncate">
                    {card.title}
                  </span>
                  {optionsCount > 0 && (
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                      {optionsCount} option
                      {optionsCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>

              {/* Visibility Toggle */}
              <Checkbox
                checked={!card.hidden}
                onChange={() => handleToggle(card.id)}
                className="scale-125"
              />
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default CustomizeModal;
