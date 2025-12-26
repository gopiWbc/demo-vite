import React, { useState } from "react";
import { Button } from "antd";
import { type CardConfig, CARD_OPTIONS } from "./cardConfig";
import CustomizeModal from "./CustomizeModal";
import DashboardCard from "./DashboardCard";
import { Settings } from "lucide-react";

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<CardConfig[]>(CARD_OPTIONS);
  const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const visibleCards = cards
    .filter((card) => !card.hidden)
    .sort((a, b) => a.order - b.order);

  /* ---------------------------
     GRID LIVE DRAG HANDLERS
  ---------------------------- */

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === index) return;

    setCards((prev) => {
      const visible = prev
        .filter((c) => !c.hidden)
        .sort((a, b) => a.order - b.order);

      const draggedCard = visible[draggedIndex];
      const updatedVisible = [...visible];

      updatedVisible.splice(draggedIndex, 1);
      updatedVisible.splice(index, 0, draggedCard);

      // Reassign order only for visible cards
      return prev.map((card) => {
        const newIndex = updatedVisible.findIndex(
          (v) => v.id === card.id
        );
        return newIndex !== -1
          ? { ...card, order: newIndex }
          : card;
      });
    });

    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  /* ---------------------------
     OTHER ACTIONS
  ---------------------------- */

  const moveCard = (
    id: string,
    direction: "first" | "last" | "up" | "down"
  ) => {
    const index = visibleCards.findIndex((c) => c.id === id);
    if (index === -1) return;

    let targetIndex = index;

    if (direction === "first") targetIndex = 0;
    if (direction === "last") targetIndex = visibleCards.length - 1;
    if (direction === "up") targetIndex = Math.max(index - 1, 0);
    if (direction === "down")
      targetIndex = Math.min(index + 1, visibleCards.length - 1);

    if (index === targetIndex) return;

    const reordered = [...visibleCards];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    setCards((prev) =>
      prev.map((card) => {
        const newIndex = reordered.findIndex((c) => c.id === card.id);
        return newIndex !== -1
          ? { ...card, order: newIndex }
          : card;
      })
    );
  };

  const handleHideCard = (id: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, hidden: true } : card
      )
    );
  };

  const handleSaveCustomization = (updatedCards: CardConfig[]) => {
    setCards(updatedCards);
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
          <h1 className="text-3xl font-medium text-gray-800 app-text-primary">
            Welcome, John Doe
          </h1>
          <Button
            type="primary"
            className="btn-primary"
            icon={<Settings className="size-4 mt-1.5" />}
            onClick={() => setCustomizeModalVisible(true)}
          >
            <span className="font-medium">Manage Dashboard</span>
          </Button>
        </div>

        <p className="text-base font-medium text-gray-600 mb-6">
          “Customize and organize your dashboard to match your daily workflow.”
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {visibleCards.map((card, index) => (
            <div
              key={card.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                transition-all duration-150
                ${
                  draggedIndex === index
                    ? "opacity-60 scale-[0.98]"
                    : "opacity-100"
                }
              `}
            >
              <DashboardCard
                card={card}
                onDragStart={() => handleDragStart(index)}
                onMoveToFirst={() => moveCard(card.id, "first")}
                onMoveUp={() => moveCard(card.id, "up")}
                onMoveDown={() => moveCard(card.id, "down")}
                onMoveToLast={() => moveCard(card.id, "last")}
                onHide={() => handleHideCard(card.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <CustomizeModal
        visible={customizeModalVisible}
        cards={cards}
        onClose={() => setCustomizeModalVisible(false)}
        onSave={handleSaveCustomization}
      />
    </>
  );
};

export default Dashboard;
