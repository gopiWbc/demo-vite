import React, { useState } from "react";
import { Button, Space } from "antd";
import { type CardConfig, CARD_OPTIONS } from "./cardConfig";
import CustomizeModal from "./CustomizeModal";
import DashboardCard from "./DashboardCard";
import { Settings } from "lucide-react";

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<CardConfig[]>(CARD_OPTIONS);
  const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
  const [draggedCard, setDraggedCard] = useState<CardConfig | null>(null);

  const visibleCards = cards
    .filter((card) => !card.hidden)
    .sort((a, b) => a.order - b.order);

  const moveCard = (
    id: string,
    direction: "first" | "last" | "up" | "down"
  ) => {
    const currentIndex = visibleCards.findIndex((c) => c.id === id);
    if (currentIndex === -1) return;

    let newCards = [...cards];

    if (direction === "first") {
      newCards = newCards.map((card) => ({
        ...card,
        order:
          card.id === id
            ? 0
            : card.order < visibleCards[currentIndex].order
            ? card.order
            : card.order + 1,
      }));
    } else if (direction === "last") {
      const maxOrder = Math.max(...visibleCards.map((c) => c.order));
      newCards = newCards.map((card) => ({
        ...card,
        order:
          card.id === id
            ? maxOrder
            : card.order > visibleCards[currentIndex].order
            ? card.order - 1
            : card.order,
      }));
    } else if (direction === "up" && currentIndex > 0) {
      const prevCard = visibleCards[currentIndex - 1];
      newCards = newCards.map((card) =>
        card.id === id
          ? { ...card, order: prevCard.order }
          : card.id === prevCard.id
          ? { ...card, order: visibleCards[currentIndex].order }
          : card
      );
    } else if (
      direction === "down" &&
      currentIndex < visibleCards.length - 1
    ) {
      const nextCard = visibleCards[currentIndex + 1];
      newCards = newCards.map((card) =>
        card.id === id
          ? { ...card, order: nextCard.order }
          : card.id === nextCard.id
          ? { ...card, order: visibleCards[currentIndex].order }
          : card
      );
    }

    setCards(newCards);
  };

  const handleHideCard = (id: string) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, hidden: true } : card
      )
    );
  };

  const handleDragStart = (card: CardConfig) => {
    setDraggedCard(card);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetCard: CardConfig) => {
    if (!draggedCard || draggedCard.id === targetCard.id) {
      setDraggedCard(null);
      return;
    }

    const newCards = cards.map((card) => {
      if (card.id === draggedCard.id) {
        return { ...card, order: targetCard.order };
      }
      if (card.id === targetCard.id) {
        return { ...card, order: draggedCard.order };
      }
      return card;
    });

    setCards(newCards);
    setDraggedCard(null);
  };

  const handleSaveCustomization = (updatedCards: CardConfig[]) => {
    setCards(updatedCards);
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
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

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-base font-medium app-text-primary mb-6 text-gray-600">
                  “Customize and organize your dashboard to match your daily workflow.”
                </p>
            </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {visibleCards.map((card) => (
            <div
              key={card.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(card)}
              className={`transition-all ${
                draggedCard?.id === card.id ? "opacity-50" : ""
              }`}
            >
              <DashboardCard
                card={card}
                onDragStart={() => handleDragStart(card)}
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
