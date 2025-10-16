import Image from "next/image";

export interface ChickenProps {
  targetCount: number;
  currentCount?: number;
  gameComplete?: boolean;
}

export function Chicken({ targetCount }: ChickenProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Target Number Display */}
      <div className="absolute top-1/2 left-1/2 z-10 translate-x-[-65%] ">
        <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-yellow-300">
          <span className="text-2xl font-bold text-gray-800">
            {targetCount}
          </span>
        </div>
      </div>

      {/* Chicken Image */}
      <div className="relative">
        <Image
          src="/chicken.svg"
          alt="Chicken"
          width={200}
          height={200}
          className="drop-shadow-lg"
          priority
        />
      </div>
    </div>
  );
}
