import { ReactNode } from "react";
import { DroppableGridCell } from "./DroppableGridCell";

export interface GameGridProps {
  rows: number;
  cols: number;
  cellSize?: string;
  className?: string;
  children?: (row: number, col: number) => ReactNode;
  onCellClick?: (row: number, col: number) => void;
}

export function GameGrid({
  rows,
  cols,
  cellSize = "w-12 h-12 lg:w-16 lg:h-16",
  className = "",
  children,
  onCellClick,
}: GameGridProps) {
  return (
    <div
      className={`grid gap-1 lg:gap-2 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => (
          <DroppableGridCell
            key={`cell-${rowIndex}-${colIndex}`}
            id={`grid-cell-${rowIndex}-${colIndex}`}
            className={`${cellSize} border-2 border-gray-800 bg-white rounded flex items-center justify-center cursor-pointer touch-manipulation`}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              onClick={() => onCellClick?.(rowIndex, colIndex)}
            >
              {children?.(rowIndex, colIndex)}
            </div>
          </DroppableGridCell>
        ))
      )}
    </div>
  );
}
