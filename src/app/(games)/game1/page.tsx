"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { When } from "react-if";
import {
  useMathematicalSortingGame,
  SHAPES,
  COLORS,
  colorMap,
} from "../../../hooks/useMathematicalSortingGame";
import { SortableToken } from "../../../components/SortableToken";
import { DroppableGridCell } from "../../../components/DroppableGridCell";
import { ShapeRenderer } from "../../../components/ShapeRenderer";

export default function Game1() {
  const {
    gameTokens,
    grid,
    gameComplete,
    activeItem,
    initializeTokens,
    sensors,
    handleDragStart,
    handleDragEnd,
  } = useMathematicalSortingGame();

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="min-h-screen bg-green-100 p-4 max-w-screen max-h-screen overflow-hidden flex gap-2 items-center h-screen"
        style={{ touchAction: "pan-y" }}
      >
        {/* Game Grid */}
        <div className="h-full w-full">
          <div className="bg-amber-100 p-4 lg:p-6 rounded-lg shadow-lg border-4 border-amber-800">
            <h2 className="text-xl lg:text-2xl font-bold text-center mb-4 text-gray-800">
              Cuadrícula de Juego
            </h2>

            {/* Grid with headers */}
            <div className="grid grid-cols-7 gap-1 lg:gap-2">
              {/* Empty top-left corner */}
              <div className="w-12 h-12 lg:w-16 lg:h-16"></div>

              {/* Color headers */}
              {COLORS.map((color) => (
                <div
                  key={color}
                  className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-2 border-gray-800 bg-white rounded"
                  style={{ backgroundColor: colorMap[color] }}
                />
              ))}

              {/* Shape rows */}
              {SHAPES.map((shape, rowIndex) => (
                <>
                  {/* Shape header */}
                  <div
                    key={`shape-${shape}`}
                    className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-2 border-gray-800 bg-white rounded"
                  >
                    <ShapeRenderer
                      shape={shape}
                      color="gray"
                      size="w-6 h-6 lg:w-8 lg:h-8"
                    />
                  </div>

                  {/* Grid cells for this row */}
                  {COLORS.map((color, colIndex) => (
                    <DroppableGridCell
                      key={`cell-${rowIndex}-${colIndex}`}
                      id={`grid-cell-${rowIndex}-${colIndex}`}
                      className="w-12 h-12 lg:w-16 lg:h-16 border-2 border-gray-800 bg-white rounded flex items-center justify-center cursor-pointer touch-manipulation"
                    >
                      {grid[rowIndex][colIndex] && (
                        <div className="transform hover:scale-110 transition-transform">
                          <ShapeRenderer
                            shape={grid[rowIndex][colIndex]!.shape}
                            color={grid[rowIndex][colIndex]!.color}
                            size="w-8 h-8 lg:w-10 lg:h-10"
                          />
                        </div>
                      )}
                    </DroppableGridCell>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Token Bank */}
        <div className="w-[20%] rounded-lg shadow-lg overflow-hidden min-h-0 h-full">
          <When condition={gameTokens.length > 0}>
            <SortableContext
              items={gameTokens.map((token) => token.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 gap-3 p-4 bg-white rounded-lg border-2 border-gray-300 justify-items-center">
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
            <div className="text-center text-gray-500 mt-8">
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
