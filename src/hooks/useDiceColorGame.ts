import { useState } from "react";
import { useDragAndDrop, DragDropItem } from "./useDragAndDrop";
import { GAME_CONFIG, COLOR_MAP, NUMBER_TO_COLOR_MAP } from "../constants/gameConfig";

export type Color = keyof typeof COLOR_MAP;

export interface ColorToken extends DragDropItem {
  color: Color;
  position?: number; // Position on turtle shell (0-11)
}

export function useDiceColorGame() {
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [colorTokens, setColorTokens] = useState<ColorToken[]>([]);
  const [turtleShell, setTurtleShell] = useState<(ColorToken | null)[]>(
    Array(GAME_CONFIG.TURTLE_SPOTS).fill(null)
  );
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [diceRolled, setDiceRolled] = useState(false); // New state to track if dice has been rolled

  // Initialize game
  const initializeGame = () => {
    // Create color tokens (1 of each color) that can be used infinitely
    const tokens: ColorToken[] = GAME_CONFIG.COLORS.map((color) => ({
      id: `token-${color}`,
      color,
    }));
    
    setColorTokens(tokens);
    setTurtleShell(Array(GAME_CONFIG.TURTLE_SPOTS).fill(null));
    setGameComplete(false);
    setGameStarted(true);
    setDiceValue(null);
    setDiceRolled(false);
  };

  // Roll dice
  const rollDice = () => {
    if (diceRolled) {
      return; // Prevent rolling if dice has already been rolled
    }
    const newValue = Math.floor(Math.random() * GAME_CONFIG.DICE_SIDES) + 1;
    setDiceValue(newValue);
    setDiceRolled(true);
  };

  // Handle item drop on turtle shell
  const handleItemDrop = (item: DragDropItem, targetId: string): boolean => {
    const colorToken = item as ColorToken;
    
    // Parse target ID (format: "turtle-spot-{index}")
    const parts = targetId.split("-");
    if (parts.length < 3 || parts[0] !== "turtle" || parts[1] !== "spot") {
      return false;
    }

    const position = parseInt(parts[2]);
    if (isNaN(position) || position < 0 || position >= GAME_CONFIG.TURTLE_SPOTS) {
      return false;
    }

    // Check if spot is empty
    if (turtleShell[position]) {
      return false;
    }

    // Check if dice is rolled and color matches
    if (diceValue === null) {
      return false;
    }

    const expectedColor = NUMBER_TO_COLOR_MAP[diceValue];
    const isCorrect = colorToken.color === expectedColor;

    if (isCorrect) {
      // Place token on turtle shell (create a new instance for the shell)
      const newTurtleShell = [...turtleShell];
      newTurtleShell[position] = { 
        id: `${colorToken.id}-${Date.now()}`, // Unique ID for the placed token
        color: colorToken.color, 
        position 
      };
      setTurtleShell(newTurtleShell);

      // Check if game is complete (all spots filled)
      if (newTurtleShell.every(spot => spot !== null)) {
        setGameComplete(true);
      }

      // Reset dice for next turn
      setDiceValue(null);
      setDiceRolled(false);
      return true;
    }

    return false;
  };

  // Handle invalid drop
  const handleInvalidDrop = () => {
    if (diceValue === null) {
      alert(GAME_CONFIG.MESSAGES.ROLL_DICE_FIRST);
    } else {
      const expectedColor = NUMBER_TO_COLOR_MAP[diceValue];
      alert(`${GAME_CONFIG.MESSAGES.TRY_AGAIN} ${expectedColor} ${GAME_CONFIG.MESSAGES.TOKEN} ${diceValue}).`);
    }
  };

  // Use the drag and drop hook
  const { activeItem, sensors, handleDragStart, handleDragEnd } = useDragAndDrop<ColorToken>(
    colorTokens,
    {
      onItemDrop: handleItemDrop,
      onInvalidDrop: handleInvalidDrop,
    }
  );

  return {
    // Game state
    diceValue,
    diceRolled,
    colorTokens,
    turtleShell,
    gameComplete,
    gameStarted,
    activeItem,
    
    // Game actions
    initializeGame,
    rollDice,
    
    // Drag and drop
    sensors,
    handleDragStart,
    handleDragEnd,
  };
}
