export const GAME_CONFIG = {
  TURTLE_SPOTS: 12,
  DICE_SIDES: 5,
  COLORS: ["orange", "gray", "blue", "red", "yellow"] as const,
  MESSAGES: {
    START_GAME: "Start Game",
    NEW_GAME: "New Game",
    ROLL_DICE_FIRST: "Roll the dice first!",
    TRY_AGAIN: "Try again! You need to place a",
    TOKEN: "token (number",
  },
} as const;

export const COLOR_MAP = {
  orange: "#f97316",
  gray: "#6b7280", 
  blue: "#3b82f6",
  red: "#ef4444",
  yellow: "#eab308",
} as const;

export const NUMBER_TO_COLOR_MAP: Record<number, keyof typeof COLOR_MAP> = {
  1: "orange",
  2: "gray",
  3: "blue",
  4: "red",
  5: "yellow",
} as const;
