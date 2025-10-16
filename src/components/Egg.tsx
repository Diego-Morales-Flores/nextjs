import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export interface EggProps {
  id: string;
  size?: string;
  className?: string;
}

export function Egg({ id, size = "w-12 h-12", className = "" }: EggProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${size} cursor-grab hover:scale-110 transition-all duration-200 touch-manipulation select-none active:scale-95 ${
        isDragging ? "opacity-0" : ""
      } ${className}`}
    >
      <Image
        src="/egg.svg"
        alt="Egg"
        width={48}
        height={48}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
