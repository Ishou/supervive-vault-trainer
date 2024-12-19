import {
  ActionDispatch,
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { GameResults } from "../GameResult";
import {
  GameOptions,
  GameOptionsAction,
  useGameOptions,
  useGameOptionsDispatch,
} from "./GameOptionsContext";
import compareRange from "../../utils/arc-compare";

export type GameState = {
  state: GameResults;
  isRunning: boolean;
  timer: number;
  maxTimer: number;
  cursorOffset: number;
};
export type GameAction =
  | {
      type: "pressOrTap";
    }
  | {
      type: "countdownEnded";
    }
  | {
      type: "newGameFrame";
      delta: number;
    };

const initialGame: GameState = {
  state: "start",
  isRunning: false,
  timer: 0,
  maxTimer: 1000,
  cursorOffset: 0,
};

const GameContext = createContext<GameState>(initialGame);

const GameDispatchContext = createContext<ActionDispatch<[GameAction]>>(null!);

export function GameProvider({
  gameStateOverride = {},
  gameDispatchOverride,
  children,
}: {
  gameStateOverride?: Partial<GameState>;
  gameDispatchOverride?: ActionDispatch<[GameAction]>;
  children: ReactNode;
}) {
  const options = useGameOptions();
  const optionsDispatch = useGameOptionsDispatch();
  const [game, dispatch] = useReducer(
    gameReducer(options, optionsDispatch),
    initialGame,
    (game) => ({
      ...game,
      ...gameStateOverride,
      cursorOffset: options.cursorStart - options.cursorSize / 2,
    }),
  );

  if (!game || !dispatch) return <></>;

  return (
    <>
      {!game || !dispatch ? (
        <></>
      ) : (
        <GameContext.Provider value={game}>
          <GameDispatchContext.Provider
            value={gameDispatchOverride || dispatch}
          >
            {children}
          </GameDispatchContext.Provider>
        </GameContext.Provider>
      )}
    </>
  );
}

export function useGameState() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

const gameReducer = (
  options: GameOptions,
  optionsDispatch: (_: GameOptionsAction) => void,
) => {
  return (game: GameState, action: GameAction) => {
    const startGame = (): GameState => {
      setTimeout(() =>
        optionsDispatch({
          type: "newGame",
          failed: game.state === "fail",
        }),
      );
      return {
        ...game,
        isRunning: true,
        state: "start",
        timer: 0,
        cursorOffset: options.cursorStart - options.cursorSize / 2,
      };
    };
    const endGame = (): GameState => {
      const range = (offset: number, size: number): [number, number] => {
        const start = offset % 360;
        const end = (offset + size) % 360;
        return [start, end];
      };
      const cursorRange = range(game.cursorOffset, options.cursorSize);
      const perfectRange = range(
        options.difficulty.perfectOffset,
        options.difficulty.perfectSize,
      );
      const okRange = range(
        options.difficulty.okOffset,
        options.difficulty.okSize,
      );

      const endWithResult = (result: GameResults) => {
        return { ...game, state: result, isRunning: false };
      };

      if (compareRange(cursorRange, perfectRange))
        return endWithResult("perfect");
      else if (compareRange(cursorRange, okRange)) return endWithResult("ok");
      else return endWithResult("fail");
    };

    switch (action.type) {
      case "pressOrTap": {
        if (game.isRunning) return endGame();
        if (game.state === "start") return { ...game, isRunning: true };
        if (!options.withCountdown || options.stopOnFail) return startGame();

        return game;
      }

      case "countdownEnded": {
        return startGame();
      }

      case "newGameFrame": {
        const updateTimer =
          options.withCountdown &&
          game.state !== "start" &&
          (game.state !== "fail" || !options.stopOnFail);

        const newTimer =
          game.timer + action.delta > game.maxTimer
            ? 0
            : game.timer + (updateTimer ? action.delta : 0);

        if (
          (game.state !== "start" && game.state !== "fail") ||
          !options.stopOnFail
        ) {
          if (options.withCountdown && updateTimer && newTimer === 0) {
            return startGame();
          }
        }

        const newCursorOffset =
          game.cursorOffset +
          (game.isRunning ? action.delta * 0.36 * options.difficulty.speed : 0);

        const greenEnd =
          options.difficulty.okOffset +
          options.difficulty.okSize +
          options.cursorSize;

        if (
          newCursorOffset >
          greenEnd + (greenEnd > options.cursorStart ? 1 : 2) * 360
        )
          return endGame();

        return {
          ...game,
          timer: newTimer,
          cursorOffset: newCursorOffset,
        };
      }

      default: {
        // @ts-expect-error missing case catch
        throw Error("Unknown game action: " + action.type);
      }
    }
  };
};
