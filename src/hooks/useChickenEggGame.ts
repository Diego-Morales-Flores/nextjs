import { useState } from "react";
import { useDragAndDrop, DragDropItem } from "./useDragAndDrop";
import { useNotification } from "../contexts/NotificationContext";

export interface EggItem extends DragDropItem {
  type: "egg";
}

export function useChickenEggGame() {
  const [targetEggCount, setTargetEggCount] = useState<number>(0);
  const [currentEggCount, setCurrentEggCount] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [availableEggs, setAvailableEggs] = useState<EggItem[]>([]);
  
  // Notification system
  const { showSuccess, showError } = useNotification();

  // Initialize game
  const initializeGame = () => {
    const randomCount = Math.floor(Math.random() * 10) + 1; // 1-10
    setTargetEggCount(randomCount);
    setCurrentEggCount(0);
    setGameComplete(false);
    setGameStarted(true);
    
    // Generate eggs for dragging
    const eggs: EggItem[] = Array.from({ length: 20 }, (_, i) => ({
      id: `egg-${i}`,
      type: "egg" as const,
    }));
    setAvailableEggs(eggs);
  };

  // Handle egg drop on stack area
  const handleItemDrop = (item: DragDropItem, targetId: string): boolean => {
    if (targetId !== "egg-stack-area") {
      return false;
    }

    if (currentEggCount >= targetEggCount) {
      return false;
    }

    // Remove egg from available eggs
    setAvailableEggs((prev: EggItem[]) => prev.filter((egg: EggItem) => egg.id !== item.id));

    // Add egg to stack
    setCurrentEggCount(prev => {
      const newCount = prev + 1;
      
      // Check if game is complete
      if (newCount >= targetEggCount) {
        setGameComplete(true);
        showSuccess("¡Excelente! Has completado el juego de huevos.", undefined, true);
      }
      
      return newCount;
    });

    return true;
  };

  // Handle invalid drop
  const handleInvalidDrop = () => {
    if (currentEggCount >= targetEggCount) {
      showError("¡El juego ya está completo! No necesitas más huevos.", 500);
    } else {
      showError("¡Coloca los huevos en el área de la gallina!", 500);
    }
  };

  // Use the drag and drop hook
  const { activeItem, sensors, handleDragStart, handleDragEnd } = useDragAndDrop<EggItem>(
    availableEggs,
    {
      onItemDrop: handleItemDrop,
      onInvalidDrop: handleInvalidDrop,
    }
  );

  return {
    // Game state
    targetEggCount,
    currentEggCount,
    gameComplete,
    gameStarted,
    activeItem,
    availableEggs,
    
    // Game actions
    initializeGame,
    
    // Drag and drop
    sensors,
    handleDragStart,
    handleDragEnd,
  };
}
