import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export interface DroppableGridCellProps {
  id: string;
  children: ReactNode;
  className?: string;
  onRender?: (isOver: boolean) => ReactNode;
}

export function DroppableGridCell({
  id,
  children,
  className = "",
  onRender,
}: DroppableGridCellProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${
        isOver
          ? "bg-blue-100 border-blue-400 scale-105 shadow-lg"
          : "hover:bg-gray-50 active:bg-blue-50"
      } transition-all duration-200 touch-manipulation`}
    >
      {onRender ? onRender(isOver) : children}
    </div>
  );
}
