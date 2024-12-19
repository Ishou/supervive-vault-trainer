import {
  ActionDispatch,
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { GameDifficulties, GameDifficulty } from "./GameDifficulties";
import { GameAction, GameProvider, GameState } from "./GameContext";

export type ComputedGameDifficulty = {
  level?: number;
  speed: number;
  okOffset: number;
  okSize: number;
  perfectOffset: number;
  perfectSize: number;
};
export type GameSliderOption = "speed" | "okSize" | "perfectMultiplier";
export type GameOptions = {
  radius: number;
  width: number;

  cursorStart: number;
  cursorSize: number;

  withCountdown: boolean;
  withAutoDifficulty: boolean;
  resetDifficultyOnFail: boolean;
  stopOnFail: boolean;

  difficulty: ComputedGameDifficulty;
};
export type GameOptionsAction =
  | {
      type: "newGame";
      failed: boolean;
    }
  | {
      type: "toggleCountdown";
    }
  | {
      type: "toggleAutoDifficulty";
    }
  | {
      type: "toggleSimpleBoolean";
      key: "resetDifficultyOnFail" | "stopOnFail";
    }
  | {
      type: "resetDifficulty";
    }
  | {
      type: "changeSliderValue";
      key: "speed" | "okSize" | "perfectMultiplier";
      value: number;
    };

const GameOptionsContext = createContext<GameOptions>(null!);

const GameOptionsDispatchContext = createContext<
  ActionDispatch<[GameOptionsAction]>
>(null!);

const updateOkOffset = (
  okOffset: number,
  difficulty: ComputedGameDifficulty,
): ComputedGameDifficulty => {
  const perfectOffset =
    okOffset + difficulty.okSize / 2 - difficulty.perfectSize / 2;

  return { ...difficulty, okOffset, perfectOffset };
};

const updateOkSize = (
  okSize: number,
  difficulty: ComputedGameDifficulty,
): ComputedGameDifficulty => {
  const perfectMultiplier = (difficulty.perfectSize * 100) / difficulty.okSize;
  const perfectSize = (okSize * perfectMultiplier) / 100;
  const perfectOffset = difficulty.okOffset + okSize / 2 - perfectSize / 2;

  return { ...difficulty, okSize, perfectSize, perfectOffset };
};

const computeDifficulty = (
  okOffset: number,
  difficulty: GameDifficulty,
): ComputedGameDifficulty => {
  const perfectSize = (difficulty.okSize * difficulty.perfectMultiplier) / 100;
  const perfectOffset = okOffset + difficulty.okSize / 2 - perfectSize / 2;
  return {
    level: difficulty.level,
    okSize: difficulty.okSize,
    speed: difficulty.speed,
    okOffset,
    perfectOffset,
    perfectSize,
  };
};

export function GameOptionsProvider({
  gameOptionsOverride = {},
  gameStateOverride = {},
  gameDispatchOverride,
  gameOptionsDispatchOverride,
  children,
}: {
  gameOptionsOverride?: Partial<GameOptions>;
  gameStateOverride?: Partial<GameState>;
  gameDispatchOverride?: ActionDispatch<[GameAction]>;
  gameOptionsDispatchOverride?: ActionDispatch<[GameOptionsAction]>;
  children: ReactNode;
}) {
  const [gameOptions, dispatch] = useReducer(
    gameOptionsReducer,
    initialGameOptions,
    (options) => ({ ...options, ...gameOptionsOverride }),
  );

  if (!gameOptions || !dispatch) return <></>;

  return (
    <GameOptionsContext.Provider value={gameOptions}>
      <GameOptionsDispatchContext.Provider
        value={gameOptionsDispatchOverride || dispatch}
      >
        <GameProvider
          gameStateOverride={gameStateOverride}
          gameDispatchOverride={gameDispatchOverride}
        >
          {children}
        </GameProvider>
      </GameOptionsDispatchContext.Provider>
    </GameOptionsContext.Provider>
  );
}

export function useGameOptions() {
  return useContext(GameOptionsContext);
}

export function useGameOptionsDispatch() {
  return useContext(GameOptionsDispatchContext);
}

function gameOptionsReducer(
  gameOptions: GameOptions,
  action: GameOptionsAction,
): GameOptions {
  switch (action.type) {
    case "newGame": {
      const okOffset = (300 + Math.random() * 160) % 360;

      if (gameOptions.difficulty.level === undefined)
        return {
          ...gameOptions,
          difficulty: updateOkOffset(okOffset, gameOptions.difficulty),
        };

      if (action.failed && gameOptions.resetDifficultyOnFail) {
        return {
          ...gameOptions,
          difficulty: computeDifficulty(okOffset, GameDifficulties[0]),
        };
      }

      return {
        ...gameOptions,
        difficulty: computeDifficulty(
          okOffset,
          GameDifficulties[
            Math.min(
              GameDifficulties.length - 1,
              gameOptions.difficulty.level + 1,
            )
          ],
        ),
      };
    }

    case "changeSliderValue": {
      // TODO meh
      switch (action.key) {
        case "okSize": {
          return {
            ...gameOptions,
            difficulty: updateOkSize(action.value, gameOptions.difficulty),
          };
        }

        case "perfectMultiplier": {
          return {
            ...gameOptions,
            difficulty: computeDifficulty(gameOptions.difficulty.okOffset, {
              ...gameOptions.difficulty,
              perfectMultiplier: action.value,
            }),
          };
        }

        default: {
          return {
            ...gameOptions,
            difficulty: {
              ...gameOptions.difficulty,
              [action.key]: action.value,
            },
          };
        }
      }
    }

    case "resetDifficulty": {
      return {
        ...gameOptions,
        difficulty: computeDifficulty(
          gameOptions.difficulty.okOffset,
          GameDifficulties[0],
        ),
      };
    }

    case "toggleSimpleBoolean": {
      return { ...gameOptions, [action.key]: !gameOptions[action.key] };
    }

    case "toggleAutoDifficulty": {
      const withAutoDifficulty = !gameOptions.withAutoDifficulty;
      return {
        ...gameOptions,
        withAutoDifficulty,
        difficulty: withAutoDifficulty
          ? computeDifficulty(gameOptions.difficulty.okOffset, {
              ...GameDifficulties[0],
            })
          : { ...gameOptions.difficulty, level: undefined },
      };
    }

    case "toggleCountdown": {
      return { ...gameOptions, withCountdown: !gameOptions.withCountdown };
    }

    default: {
      // @ts-expect-error missing case catch
      throw Error("Unknown game action: " + action.type);
    }
  }
}

const initialGameOptions: GameOptions = {
  radius: 64,
  width: 10,
  cursorStart: 180,
  cursorSize: 3,
  withCountdown: true,
  withAutoDifficulty: true,
  resetDifficultyOnFail: false,
  stopOnFail: true,
  difficulty: computeDifficulty(0, GameDifficulties[0]),
};
