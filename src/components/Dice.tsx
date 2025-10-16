import { COLOR_MAP, NUMBER_TO_COLOR_MAP } from "../constants/gameConfig";

export interface DiceProps {
  value: number | null;
  onRoll: () => void;
  disabled?: boolean;
}

export function Dice({ value, onRoll, disabled = false }: DiceProps) {
  const getDiceColor = () => {
    if (value === null) return "#e5e7eb"; // gray-200
    return COLOR_MAP[NUMBER_TO_COLOR_MAP[value]];
  };

  const getDiceTextColor = () => {
    if (value === null) return "#6b7280"; // gray-500
    return "#ffffff"; // white for contrast
  };

  return (
    <button
      className="w-20 h-20 rounded-lg border-4 border-gray-800 flex items-center justify-center text-2xl font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200 touch-manipulation disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        backgroundColor: getDiceColor(),
        color: getDiceTextColor(),
      }}
      onClick={disabled ? undefined : onRoll}
      disabled={disabled}
    >
      {value || "?"}
    </button>
  );
}
