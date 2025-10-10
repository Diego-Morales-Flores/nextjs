import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export interface DragDropItem {
  id: string;
  [key: string]: unknown;
}

export interface DragDropConfig {
  onDragStart?: (item: DragDropItem | null) => void;
  onDragEnd?: (activeId: string, overId: string | null) => void;
  onItemDrop?: (item: DragDropItem, targetId: string) => boolean;
  onInvalidDrop?: (item: DragDropItem) => void;
}

export function useDragAndDrop<T extends DragDropItem>(
  items: T[],
  config: DragDropConfig = {}
) {
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 15,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const item = items.find((item) => item.id === event.active.id);
    setActiveItem(item || null);
    config.onDragStart?.(item || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeItem = items.find((item) => item.id === active.id);
    
    setActiveItem(null);
    
    if (!over || !activeItem) {
      config.onDragEnd?.(String(active.id), null);
      return;
    }

    const overId = String(over.id);
    config.onDragEnd?.(String(active.id), overId);

    // Check if the drop is valid
    const isValidDrop = config.onItemDrop?.(activeItem, overId);
    
    if (!isValidDrop) {
      config.onInvalidDrop?.(activeItem);
    }
  };

  return {
    activeItem,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
}
