import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

export interface SortableTokenProps {
  id: string;
  children: ReactNode;
  className?: string;
  isDragging?: boolean;
  onRender?: (isDragging: boolean) => ReactNode;
}

export function SortableToken({
  id,
  children,
  className = "",
  isDragging: externalIsDragging,
  onRender,
}: SortableTokenProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const isCurrentlyDragging =
    externalIsDragging !== undefined ? externalIsDragging : isDragging;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab hover:scale-110 transition-transform duration-200 flex items-center justify-center p-3 bg-white rounded-lg border-2 border-gray-300 hover:border-blue-400 hover:shadow-md w-fit h-fit touch-manipulation select-none active:scale-95 ${
        isCurrentlyDragging ? "opacity-50" : ""
      } ${className}`}
      style={style}
    >
      {onRender ? onRender(isCurrentlyDragging) : children}
    </div>
  );
}
