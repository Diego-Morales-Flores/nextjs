"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { When } from "react-if";
import { useMathematicalSortingGame } from "../../../hooks/useMathematicalSortingGame";
import { SortableToken } from "../../../components/SortableToken";
import { ShapeRenderer } from "../../../components/ShapeRenderer";
import useOrientation from "@/hooks/useOrientation";
import { twMerge } from "tailwind-merge";
import ColorGrid from "./ColorGrid";
import ShapeGrid from "./ShapeGrid";

export default function Game1() {
  const { isPortrait, isHydrated } = useOrientation();

  const {
    gameTokens,
    grid,
    gameComplete,
    activeItem,
    initializeTokens,
    sensors,
    handleDragStart,
    handleDragEnd,
  } = useMathematicalSortingGame(isPortrait);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-green-100 p-4 max-w-screen max-h-screen overflow-hidden flex gap-2 items-center h-screen">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-lg">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className={twMerge(
          "min-h-screen bg-green-100 p-4 max-w-screen max-h-screen overflow-hidden flex gap-2 items-center h-screen",
          isPortrait ? "flex-col justify-center" : "flex-row"
        )}
        style={{ touchAction: "pan-y" }}
      >
        {/* Game Grid */}
        <div
          className={twMerge(
            isPortrait ? "w-full h-fit" : "h-full w-full flex items-center"
          )}
        >
          <div className="bg-amber-100 p-4 lg:p-6 rounded-lg shadow-lg border-4 border-amber-800 w-full">
            <h2 className="text-xl lg:text-2xl font-bold text-center mb-4 text-gray-800">
              Cuadrícula de Juego
            </h2>

            {/* Grid with headers */}
            <div
              className={twMerge(
                "grid  gap-1 lg:gap-2",
                isPortrait ? "grid-cols-4" : "grid-cols-7"
              )}
            >
              {/* Empty top-left corner */}
              <div className="w-12 h-12 lg:w-16 lg:h-16"></div>

              {/* Color headers */}
              {isPortrait ? (
                <ShapeGrid grid={grid} />
              ) : (
                <ColorGrid grid={grid} />
              )}

              {/* Shape rows */}
              {isPortrait ? (
                <ColorGrid grid={grid} />
              ) : (
                <ShapeGrid grid={grid} />
              )}
            </div>
          </div>
        </div>

        {/* Token Bank */}
        <div
          className={twMerge(
            "rounded-lg overflow-hidden min-h-0",
            isPortrait ? "h-fit w-fit max-w-full" : "w-[20%] h-fit max-h-full"
          )}
        >
          <When condition={gameTokens.length > 0}>
            <SortableContext
              items={gameTokens.map((token) => token.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                className={twMerge(
                  "gap-3 p-4 bg-white rounded-lg border-2 border-gray-300 flex touch-manipulation",
                  isPortrait ? "flex-row" : "flex-col"
                )}
                style={{ touchAction: "none" }}
              >
                {gameTokens.map((token) => (
                  <SortableToken key={token.id} id={token.id}>
                    <ShapeRenderer
                      shape={token.shape}
                      color={token.color}
                      size="w-10 h-10 lg:w-12 lg:h-12"
                    />
                  </SortableToken>
                ))}
              </div>
            </SortableContext>
          </When>

          <When condition={gameComplete || gameTokens.length === 0}>
            <div className="text-center text-gray-500">
              <button
                onClick={initializeTokens}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-colors"
              >
                Nuevo Juego
              </button>
            </div>
          </When>
        </div>
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className="transform rotate-6 scale-80 cursor-grab">
            <ShapeRenderer
              shape={activeItem.shape}
              color={activeItem.color}
              size="w-16 h-16"
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
