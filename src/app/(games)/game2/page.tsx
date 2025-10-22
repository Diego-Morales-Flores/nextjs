"use client";

import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { When } from "react-if";
import { useDiceColorGame } from "../../../hooks/useDiceColorGame";
import { ColorToken } from "../../../components/ColorToken";
import { Dice } from "../../../components/Dice";
import { TurtleGrid } from "../../../components/TurtleGrid";
import { GAME_CONFIG } from "../../../constants/gameConfig";
import { twMerge } from "tailwind-merge";
import useOrientation from "@/hooks/useOrientation";

export default function Game2() {
  const {
    diceValue,
    colorTokens,
    turtleShell,
    gameComplete,
    gameStarted,
    activeItem,
    initializeGame,
    rollDice,
    sensors,
    handleDragStart,
    handleDragEnd,
  } = useDiceColorGame();

  const { isPortrait } = useOrientation();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="min-h-screen bg-ocean p-4 max-w-screen max-h-screen overflow-hidden flex flex-col gap-4 h-screen"
        style={{ touchAction: "pan-y" }}
      >
        {/* Game Content */}
        <div
          className={twMerge(
            "flex-1 flex gap-4 items-center justify-center",
            isPortrait ? "flex-col h-fit" : "flex-row h-full"
          )}
        >
          {/* Center - Turtle Grid */}
          <TurtleGrid turtleShell={turtleShell} />

          {/* Right Side - Color Tokens */}
          <div className="min-w-[20%] shrink-0">
            <When
              condition={colorTokens.length > 0 && gameStarted && !gameComplete}
            >
              <SortableContext
                items={colorTokens.map((token) => token.id)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  className={twMerge(
                    "flex flex-col gap-2 touch-manipulation",
                    isPortrait ? "flex-row" : "flex-col"
                  )}
                  style={{ touchAction: "none" }}
                >
                  <Dice
                    value={diceValue}
                    onRoll={rollDice}
                    disabled={!gameStarted || gameComplete}
                  />
                  <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-300 flex flex-col items-center justify-center">
                    <div
                      className={twMerge(
                        "flex flex-col gap-2 touch-manipulation",
                        isPortrait ? "flex-row" : "flex-col"
                      )}
                      style={{ touchAction: "none" }}
                    >
                      {colorTokens.map((token, index) => (
                        <div
                          key={token.id}
                          className={twMerge(
                            "flex items-center gap-2",
                            isPortrait ? "flex-col-reverse" : "flex-row"
                          )}
                        >
                          <ColorToken
                            id={token.id}
                            color={token.color}
                            size="w-8 h-8"
                          />
                          <span className="text-2xl font-bold text-gray-700">
                            {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SortableContext>
            </When>

            <When condition={!gameStarted || gameComplete}>
              <div className="text-center mt-4">
                <button
                  onClick={initializeGame}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition-colors font-semibold"
                >
                  {!gameStarted
                    ? GAME_CONFIG.MESSAGES.START_GAME
                    : GAME_CONFIG.MESSAGES.NEW_GAME}
                </button>
              </div>
            </When>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className="transform -translate-x-1/2 -translate-y-1/2 rotate-6 scale-75 cursor-grab">
            <ColorToken
              id={activeItem.id}
              color={activeItem.color}
              size="w-16 h-16"
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
