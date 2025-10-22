import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Color } from "../hooks/useDiceColorGame";
import { COLOR_MAP } from "../constants/gameConfig";

export interface ColorTokenProps {
  id: string;
  color: Color;
  size?: string;
  className?: string;
}

export function ColorToken({
  id,
  color,
  size = "w-12 h-12",
  className = "",
}: ColorTokenProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: COLOR_MAP[color],
      }}
      {...attributes}
      {...listeners}
      className={`${size} rounded-full border-3 border-gray-800 cursor-grab hover:scale-110 transition-all duration-200 touch-manipulation select-none active:scale-95 ${
        isDragging ? "opacity-60 scale-110 shadow-2xl" : ""
      } ${className}`}
    />
  );
}
