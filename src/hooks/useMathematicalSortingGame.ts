import { useState } from "react";
import { useDragAndDrop, DragDropItem } from "./useDragAndDrop";
import { shuffleArray } from "../utils/arrayUtils";

export type Shape = "circle" | "square" | "triangle";
export type Color = "red" | "yellow" | "purple" | "green" | "pink" | "blue";

export interface GameToken extends DragDropItem {
  shape: Shape;
  color: Color;
  position?: { row: number; col: number };
}

export const SHAPES: Shape[] = ["circle", "square", "triangle"];
export const COLORS: Color[] = ["red", "yellow", "purple", "green", "pink", "blue"];

export const colorMap = {
  red: "#ef4444",
  yellow: "#eab308",
  purple: "#a855f7",
  green: "#22c55e",
  pink: "#ec4899",
  blue: "#06b6d4",
};

export function useMathematicalSortingGame() {
  const [gameTokens, setGameTokens] = useState<GameToken[]>([]);
  const [grid, setGrid] = useState<(GameToken | null)[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(6).fill(null))
  );
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Initialize game tokens
  const initializeTokens = () => {
    const tokens: GameToken[] = [];
    let id = 0;

    SHAPES.forEach((shape) => {
      COLORS.forEach((color) => {
        tokens.push({ id: `token-${id++}`, shape, color });
      });
    });
    setGameTokens(shuffleArray(tokens));
    setGrid(Array(3).fill(null).map(() => Array(6).fill(null)));
    setScore(0);
    setGameComplete(false);
  };

  // Handle item drop
  const handleItemDrop = (item: DragDropItem, targetId: string): boolean => {
    const gameToken = item as GameToken;
    // Parse target ID (format: "grid-cell-row-col")
    const parts = targetId.split("-");
    if (parts.length < 4 || parts[0] !== "grid" || parts[1] !== "cell") {
      return false;
    }

    const row = parseInt(parts[2]);
    const col = parseInt(parts[3]);

    // Validate row and col are valid numbers and within bounds
    if (
      isNaN(row) ||
      isNaN(col) ||
      row < 0 ||
      row >= grid.length ||
      col < 0 ||
      col >= grid[0].length
    ) {
      return false;
    }

    // Check if cell is empty
    if (grid[row][col]) {
      return false;
    }

    // Check if the position is correct
    const correctShape = SHAPES[row];
    const correctColor = COLORS[col];
    const isCorrect = gameToken.shape === correctShape && gameToken.color === correctColor;

    if (isCorrect) {
      // Place token on grid
      const newGrid = [...grid];
      newGrid[row][col] = gameToken;
      setGrid(newGrid);

      // Remove token from available tokens
      setGameTokens((prev) => prev.filter((t) => t.id !== gameToken.id));
      setScore((prev) => prev + 10);

      // Check if game is complete
      const remainingTokens = gameTokens.filter((t) => t.id !== gameToken.id);
      if (remainingTokens.length === 0) {
        setGameComplete(true);
      }

      return true;
    }

    return false;
  };

  // Handle invalid drop
  const handleInvalidDrop = (item: DragDropItem) => {
    alert("¡Inténtalo de nuevo! Coloca la forma en la fila y columna correctas.");
  };

  // Use the drag and drop hook
  const { activeItem, sensors, handleDragStart, handleDragEnd } = useDragAndDrop<GameToken>(
    gameTokens,
    {
      onItemDrop: handleItemDrop,
      onInvalidDrop: handleInvalidDrop,
    }
  );

  return {
    // Game state
    gameTokens,
    grid,
    score,
    gameComplete,
    activeItem,
    
    // Game actions
    initializeTokens,
    
    // Drag and drop
    sensors,
    handleDragStart,
    handleDragEnd,
  };
}
