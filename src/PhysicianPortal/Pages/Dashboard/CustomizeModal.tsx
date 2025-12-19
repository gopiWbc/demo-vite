import React, { useState } from "react";
import { Modal, Checkbox, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import type { CardConfig } from "./cardConfig";

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
  const [localCards, setLocalCards] = useState<CardConfig[]>(cards);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      return;
    }

    const newCards = [...localCards];
    const draggedCard = newCards[draggedIndex];

    newCards.splice(draggedIndex, 1);
    newCards.splice(index, 0, draggedCard);

    setLocalCards(
      newCards.map((card, i) => ({
        ...card,
        order: i,
      }))
    );

    setDraggedIndex(null);
  };

  const handleSave = () => {
    onSave(localCards);
    onClose();
  };

  return (
    <Modal
      title="Your Shortcuts"
      classNames={{
        container:"!p-0 [&_.ant-modal-close]:!text-white",
        header:'bg-app-primary !p-4',
        title:'!text-white',
        body:'!px-4',
        footer:'!px-4 !pb-4',
        
      }}
      open={visible}
      onCancel={onClose}
      width={720}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <p className="app-text-primary mb-4 text-sm">
        Drag and drop rows to reorder. Use the checkbox to show or hide shortcuts.
      </p>

      <div className="max-h-[65vh] overflow-y-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left py-3 px-4 text-sm font-semibold w-12">
                S.No
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold w-28">
                Show
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold">
                Shortcut Name
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold w-16">
                Drag
              </th>
            </tr>
          </thead>

          <tbody>
            {localCards.map((card, index) => (
              <tr
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className={`border-b border-gray-200 transition-colors
                  ${draggedIndex === index ? "bg-blue-50" : "hover:bg-gray-50"}
                  ${card.hidden ? "opacity-60" : ""}
                `}
              >
                <td className="py-3 px-4 text-sm">
                  {index + 1}
                </td>

                <td className="py-3 px-4">
                  <Checkbox
                    checked={!card.hidden}
                    onChange={() => handleToggle(card.id)}
                  />
                </td>

                <td className="py-3 px-4 text-sm">
                  {card.title}
                </td>

                <td className="py-3 px-4 text-center cursor-grab active:cursor-grabbing">
                  <MenuOutlined className="text-gray-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default CustomizeModal;
