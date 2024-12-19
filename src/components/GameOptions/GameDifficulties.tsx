export type GameDifficulty = {
  level?: number;
  speed: number;
  okSize: number;
  perfectMultiplier: number;
};

export const GameDifficulties: GameDifficulty[] = [
  {
    level: 0,
    speed: 1.0,
    okSize: 140,
    perfectMultiplier: 50,
  },
  {
    level: 1,
    speed: 1.0,
    okSize: 70,
    perfectMultiplier: 25,
  },
  {
    level: 2,
    speed: 1.0,
    okSize: 20,
    perfectMultiplier: 12,
  },
  {
    level: 3,
    speed: 1.0,
    okSize: 10,
    perfectMultiplier: 12,
  },
];
