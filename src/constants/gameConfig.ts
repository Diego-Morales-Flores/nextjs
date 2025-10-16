export const GAME_CONFIG = {
  TURTLE_SPOTS: 12,
  DICE_SIDES: 5,
  COLORS: ["orange", "gray", "blue", "red", "yellow"] as const,
  MESSAGES: {
    START_GAME: "Comenzar Juego",
    NEW_GAME: "Nuevo Juego",
    ROLL_DICE_FIRST: "Lanzar el dado primero!",
    TRY_AGAIN: "Intenta de nuevo! Necesitas colocar un",
    TOKEN: "token (número",
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
