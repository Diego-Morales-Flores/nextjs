import { useDroppable } from "@dnd-kit/core";
import { twMerge } from "tailwind-merge";
import { ColorToken } from "./ColorToken";
import { ColorToken as ColorTokenType } from "../hooks/useDiceColorGame";

export interface TurtleSpotProps {
  id: string;
  className: string;
  token: ColorTokenType | null;
}

export function TurtleSpot({ id, className, token }: TurtleSpotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={twMerge(
        "absolute size-10 rounded-full border-2 flex items-center",
        "justify-center cursor-pointer transition-all duration-300 touch-manipulation",
        className,
        token ? "cursor-default" : "hover:scale-105 hover:shadow-lg"
      )}
      style={{
        borderColor: isOver ? "#10b981" : token ? "#6b7280" : "#374151",
        backgroundColor: isOver
          ? "rgba(16, 185, 129, 0.2)"
          : token
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(255, 255, 255, 0.8)",
        boxShadow: isOver
          ? "0 0 0 4px rgba(16, 185, 129, 0.3)"
          : token
          ? "0 2px 4px rgba(0, 0, 0, 0.1)"
          : "0 1px 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      {token && (
        <ColorToken
          id={token.id}
          color={token.color}
          size="size-8"
          className="cursor-default"
        />
      )}
      {!token && isOver && (
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-green-500 animate-pulse" />
      )}
    </div>
  );
}
