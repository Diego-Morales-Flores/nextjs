import React from "react";
import { DroppableGridCell } from "@/components/DroppableGridCell";
import { ShapeRenderer } from "@/components/ShapeRenderer";
import { COLORS, SHAPES, GameToken } from "@/hooks/useMathematicalSortingGame";
import { colorMap } from "@/hooks/useMathematicalSortingGame";
import useOrientation from "@/hooks/useOrientation";

interface ColorGridProps {
  grid: (GameToken | null)[][];
}

function ColorGrid({ grid }: ColorGridProps) {
  const { isPortrait } = useOrientation();

  // En modo portrait, mostramos las filas de colores
  if (isPortrait) {
    return COLORS.map((color, rowIndex) => (
      <React.Fragment key={`color-row-${rowIndex}`}>
        <div
          className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-2 border-gray-800 bg-white rounded"
          style={{ backgroundColor: colorMap[color] }}
        />
        {SHAPES.map((shape, colIndex) => (
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

  // En modo landscape, mostramos las columnas de colores
  return COLORS.map((color, colIndex) => (
    <div
      key={`color-col-${colIndex}`}
      className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-2 border-gray-800 bg-white rounded"
      style={{ backgroundColor: colorMap[color] }}
    />
  ));
}

export default ColorGrid;
