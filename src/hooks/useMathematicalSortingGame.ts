import { useState, useEffect, useRef } from "react";
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

export function useMathematicalSortingGame(isPortrait: boolean = true) {
  const [gameTokens, setGameTokens] = useState<GameToken[]>([]);
  const [grid, setGrid] = useState<(GameToken | null)[][]>(() => {
    // Inicializar grid según orientación
    if (isPortrait) {
      // En portrait: filas = colores (6), columnas = formas (3)
      return Array(COLORS.length)
        .fill(null)
        .map(() => Array(SHAPES.length).fill(null));
    } else {
      // En landscape: filas = formas (3), columnas = colores (6)
      return Array(SHAPES.length)
        .fill(null)
        .map(() => Array(COLORS.length).fill(null));
    }
  });
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const gridRef = useRef(grid);

  // Actualizar referencia del grid
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  // Re-inicializar grid cuando cambie la orientación
  useEffect(() => {
    // Solo re-inicializar si el grid actual no tiene la estructura correcta
    const currentRows = gridRef.current.length;
    const currentCols = gridRef.current[0]?.length || 0;
    
    if (isPortrait) {
      // En portrait: filas = colores (6), columnas = formas (3)
      if (currentRows !== COLORS.length || currentCols !== SHAPES.length) {
        // Migrar elementos existentes al nuevo grid
        const newGrid = Array(COLORS.length)
          .fill(null)
          .map(() => Array(SHAPES.length).fill(null));
        
        // Migrar elementos del grid anterior
        gridRef.current.forEach((row) => {
          row.forEach((cell) => {
            if (cell) {
              // Encontrar la nueva posición basada en la forma y color
              const newRow = COLORS.indexOf(cell.color);
              const newCol = SHAPES.indexOf(cell.shape);
              if (newRow !== -1 && newCol !== -1 && newGrid[newRow][newCol] === null) {
                newGrid[newRow][newCol] = cell;
              }
            }
          });
        });
        
        setGrid(newGrid);
      }
    } else {
      // En landscape: filas = formas (3), columnas = colores (6)
      if (currentRows !== SHAPES.length || currentCols !== COLORS.length) {
        // Migrar elementos existentes al nuevo grid
        const newGrid = Array(SHAPES.length)
          .fill(null)
          .map(() => Array(COLORS.length).fill(null));
        
        // Migrar elementos del grid anterior
        gridRef.current.forEach((row) => {
          row.forEach((cell) => {
            if (cell) {
              // Encontrar la nueva posición basada en la forma y color
              const newRow = SHAPES.indexOf(cell.shape);
              const newCol = COLORS.indexOf(cell.color);
              if (newRow !== -1 && newCol !== -1 && newGrid[newRow][newCol] === null) {
                newGrid[newRow][newCol] = cell;
              }
            }
          });
        });
        
        setGrid(newGrid);
      }
    }
  }, [isPortrait]);

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
    // Reinicializar grid según orientación actual
    if (isPortrait) {
      setGrid(Array(COLORS.length).fill(null).map(() => Array(SHAPES.length).fill(null)));
    } else {
      setGrid(Array(SHAPES.length).fill(null).map(() => Array(COLORS.length).fill(null)));
    }
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
    // La lógica cambia según la orientación
    let correctShape, correctColor;
    
    if (isPortrait) {
      // En portrait: filas = colores, columnas = formas
      correctColor = COLORS[row];
      correctShape = SHAPES[col];
    } else {
      // En landscape: filas = formas, columnas = colores
      correctShape = SHAPES[row];
      correctColor = COLORS[col];
    }
    
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
  const handleInvalidDrop = () => {
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
