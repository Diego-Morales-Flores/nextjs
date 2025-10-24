import Image from "next/image";

export interface DiceProps {
  value: number | null;
  onRoll: () => void;
  disabled?: boolean;
}

export function Dice({ value, onRoll, disabled = false }: DiceProps) {
  const getDiceImage = () => {
    if (value === null) return "/dado-0.svg";
    return `/dado-${value}.svg`;
  };

  return (
    <button
      className="w-20 h-20 flex items-center justify-center touch-manipulation disabled:cursor-not-allowed bg-transparent"
      onClick={disabled ? undefined : onRoll}
      disabled={disabled}
    >
      <Image
        src={getDiceImage()}
        alt={`Dado ${value || "?"}`}
        width={64}
        height={64}
        className="w-full h-full object-contain"
      />
    </button>
  );
}
