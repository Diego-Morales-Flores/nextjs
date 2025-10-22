"use client";

import Image from "next/image";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { When } from "react-if";
import { useChickenEggGame } from "../../../hooks/useChickenEggGame";
import { Chicken } from "../../../components/Chicken";
import { Egg } from "../../../components/Egg";
import { EggStack } from "../../../components/EggStack";
import { GAME_CONFIG } from "../../../constants/gameConfig";
import useOrientation from "@/hooks/useOrientation";
import { twMerge } from "tailwind-merge";

export default function Game3() {
  const {
    targetEggCount,
    currentEggCount,
    gameComplete,
    gameStarted,
    activeItem,
    availableEggs,
    initializeGame,
    sensors,
    handleDragStart,
    handleDragEnd,
  } = useChickenEggGame();

  const { isPortrait } = useOrientation();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="min-h-screen bg-farm bg-opacity-20 p-4 max-w-screen max-h-screen overflow-hidden flex flex-col gap-4 h-screen"
        style={{ touchAction: "pan-y" }}
      >
        {/* Game Content */}
        <div
          className={twMerge(
            "flex-1 flex items-center justify-center h-full gap-8",
            isPortrait ? "flex-col h-fit" : "flex-row h-full"
          )}
        >
          {/* Chicken Area */}
          <div className="flex flex-col items-center">
            <Chicken targetCount={targetEggCount} />
            <EggStack
              currentCount={currentEggCount}
              targetCount={targetEggCount}
            />
          </div>

          {/* Egg Collection Area */}
          <When condition={gameStarted && !gameComplete}>
            <div className="flex flex-col items-center gap-4">
              <div
                className="flex flex-wrap justify-center gap-3 max-w-md touch-manipulation"
                style={{ touchAction: "none" }}
              >
                {availableEggs.map((egg) => (
                  <Egg key={egg.id} id={egg.id} size="w-12 h-12" />
                ))}
              </div>
            </div>
          </When>

          {/* Control Area */}
          <When condition={!gameStarted || gameComplete}>
            <button
              onClick={initializeGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg shadow-lg transition-colors font-semibold text-lg"
            >
              {!gameStarted
                ? GAME_CONFIG.MESSAGES.START_GAME
                : GAME_CONFIG.MESSAGES.NEW_GAME}
            </button>
          </When>
        </div>
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className="transform -translate-x-1/2 -translate-y-1/2 rotate-6 scale-75 cursor-grab">
            <div className="w-16 h-16">
              <Image
                src="/egg.svg"
                alt="Dragging Egg"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
