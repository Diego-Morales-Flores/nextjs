import { DroppableGridCell } from "@/components/DroppableGridCell";
import { ShapeRenderer } from "@/components/ShapeRenderer";
import { SHAPES, GameToken } from "@/hooks/useMathematicalSortingGame";
import { COLORS } from "@/hooks/useMathematicalSortingGame";
import useOrientation from "@/hooks/useOrientation";
import React from "react";

interface ShapeGridProps {
  grid: (GameToken | null)[][];
}

function ShapeGrid({ grid }: ShapeGridProps) {
  const { isLandscape } = useOrientation();

  // En modo landscape, mostramos las filas de formas
  if (isLandscape) {
    return SHAPES.map((shape, rowIndex) => (
      <React.Fragment key={`shape-row-${rowIndex}`}>
        {/* Shape header */}
        <div className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-2 border-gray-800 bg-white rounded">
          <ShapeRenderer
            shape={shape}
            color="gray"
            size="w-6 h-6 lg:w-8 lg:h-8"
          />
        </div>

        {COLORS.map((color, colIndex) => (
          <DroppableGridCell
            key={`cell-${rowIndex}-${colIndex}`}
            id={`grid-cell-${rowIndex}-${colIndex}`}
            className="w-12 h-12 lg:w-16 lg:h-16 border-2 border-gray-800 bg-white rounded flex items-center justify-center cursor-pointer touch-manipulation"
          >
            {grid[rowIndex] && grid[rowIndex][colIndex] && (
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
      </React.Fragment>
    ));
  }

  // En modo portrait, mostramos las columnas de formas
  return SHAPES.map((shape, colIndex) => (
    <div
      key={`shape-col-${colIndex}`}
      className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-2 border-gray-800 bg-white rounded"
    >
      <ShapeRenderer shape={shape} color="gray" size="w-6 h-6 lg:w-8 lg:h-8" />
    </div>
  ));
}

export default ShapeGrid;
