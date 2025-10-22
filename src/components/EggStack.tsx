import Image from "next/image";
import { useDroppable } from "@dnd-kit/core";

export interface EggStackProps {
  currentCount: number;
  targetCount: number;
}

export function EggStack({ currentCount, targetCount }: EggStackProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "egg-stack-area",
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Stack Area */}
      <div
        ref={setNodeRef}
        className={`w-32 h-32 border-8 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-300 touch-manipulation ${
          isOver
            ? "border-yellow-400 bg-yellow-100/20 scale-105"
            : "border-yellow-300 bg-yellow-50/10"
        }`}
        style={{ touchAction: "none" }}
      >
        <div className="flex flex-wrap justify-center items-end gap-1 max-w-full">
          {Array.from({ length: currentCount }, (_, index) => (
            <div key={`stacked-egg-${index}`} className="w-8 h-8">
              <Image
                src="/egg.svg"
                alt="Stacked Egg"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-48 bg-white/20 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-500 ease-out"
          style={{ width: `${(currentCount / targetCount) * 100}%` }}
        />
      </div>
    </div>
  );
}
