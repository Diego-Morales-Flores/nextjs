import Image from "next/image";
import { ColorToken as ColorTokenType } from "../hooks/useDiceColorGame";
import { TurtleSpot } from "./TurtleSpot";

export interface TurtleGridProps {
  turtleShell: (ColorTokenType | null)[];
}

const TURTLE_SPOT_POSITIONS = [
  { className: "left-[26.5%] top-[28%] max-mobile:left-[21.5%]" },
  { className: "left-[54%] top-[18%] max-mobile:left-[49%]" },
  { className: "left-[82.5%] top-[28%] max-mobile:left-[77.5%]" },
  { className: "left-[41%] top-[20%] max-mobile:left-[36%]" },
  { className: "left-[68%] top-[20%] max-mobile:left-[63%]" },
  { className: "left-[54%] top-[35%] max-mobile:left-[49%]" },
  { className: "left-[41%] top-[35%] max-mobile:left-[36%]" },
  { className: "left-[68%] top-[35%] max-mobile:left-[63%]" },
  { className: "left-[19%] top-[42.5%] max-mobile:left-[14%]" },
  { className: "left-[91%] top-[42.5%] max-mobile:left-[86%]" },
  { className: "left-[41%] top-[50%] max-mobile:left-[36%]" },
  { className: "left-[68%] top-[50%] max-mobile:left-[63%]" },
];

export function TurtleGrid({ turtleShell }: TurtleGridProps) {
  return (
    <div className="relative size-full flex items-center justify-center flex-1">
      <div className="relative h-full w-fit">
        <Image
          src="/turtle.svg"
          alt="Turtle"
          width={400}
          height={400}
          className="h-full !w-fit"
        />
        {TURTLE_SPOT_POSITIONS.map((position, index) => (
          <TurtleSpot
            key={`turtle-spot-${index}`}
            id={`turtle-spot-${index}`}
            className={position.className}
            token={turtleShell[index] || null}
          />
        ))}
      </div>
    </div>
  );
}
