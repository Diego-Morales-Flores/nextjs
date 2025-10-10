import { Color, colorMap } from "../hooks/useMathematicalSortingGame";

export type Shape = "circle" | "square" | "triangle";

interface ShapeRendererProps {
  shape: Shape;
  color: Color | "gray";
  size?: string;
  className?: string;
}

export function ShapeRenderer({
  shape,
  color,
  size = "w-8 h-8",
  className = "",
}: ShapeRendererProps) {
  const backgroundColor =
    color === "gray" ? "#9ca3af" : colorMap[color as Color];

  const baseClasses = `${size} border-2 border-gray-800 ${className}`;

  switch (shape) {
    case "circle":
      return (
        <div
          className={`${baseClasses} rounded-full`}
          style={{ backgroundColor }}
        />
      );
    case "square":
      return <div className={baseClasses} style={{ backgroundColor }} />;
    case "triangle":
      return (
        <div
          className={baseClasses}
          style={{
            backgroundColor,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      );
    default:
      return null;
  }
}
