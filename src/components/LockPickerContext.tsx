import * as React from "react";
import { ActionDispatch, createContext, useReducer } from "react";
import compareRange from "../../utils/arc-compare";

type SetOption = {
  type: "setOption";
  key: keyof LockPickerState["options"];
  value: number;
};

type ResetDifficulty = {
  type: "resetDifficulty";
};

type UpdateResult = {
  type: "updateResult";
  offset: number;
  size: number;
  cursorOffset: number;
  cursorSize: number;
  perfectOffset: number;
  perfectSize: number;
};

type NewFrame = {
  type: "newFrame";
  deltaTime: number;
  running: boolean;
};

type ToggleAutoDifficulty = {
  type: "toggleAutoDifficulty";
};

export type LockPickerResult = "perfect" | "ok" | "fail" | "start";
export type LockPickerAction =
  | SetOption
  | ResetDifficulty
  | UpdateResult
  | NewFrame
  | ToggleAutoDifficulty;

const defaultState = {
  result: "start" as LockPickerResult,
  difficulty: 0,
  autoDifficulty: true,
  offset: 0,
  cursor: 0,
  options: {
    speed: 1.0,
    size: 140,
    perfectMultiplier: 50,
  },
  fpsCounter: {
    lasts: [] as number[],
    label: "000",
  },
};
export type LockPickerState = typeof defaultState;
export type LockPickerOptionKey = keyof (typeof defaultState)["options"];

export const LockPickerContext = createContext(defaultState);
export const LockPickerDispatchContext = createContext<
  ActionDispatch<[action: LockPickerAction]>
>(null!);

export default function LockPickerProvider(props: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    lockPickerReducer,
    null,
    () => defaultState,
  );

  return (
    <LockPickerContext.Provider value={state}>
      <LockPickerDispatchContext.Provider value={dispatch}>
        {props.children}
      </LockPickerDispatchContext.Provider>
    </LockPickerContext.Provider>
  );
}

const difficulties: (typeof defaultState.options)[] = [
  {
    speed: 1.0,
    size: 140,
    perfectMultiplier: 50,
  },
  {
    speed: 1.0,
    size: 70,
    perfectMultiplier: 25,
  },
  {
    speed: 1.0,
    size: 17.5,
    perfectMultiplier: 12.5,
  },
];

function lockPickerReducer(
  state: LockPickerState,
  action: LockPickerAction,
): LockPickerState {
  switch (action.type) {
    case "setOption": {
      return {
        ...state,
        options: {
          ...state.options,
          [action.key]: action.value,
        },
      };
    }

    case "resetDifficulty": {
      return {
        ...state,
        difficulty: 0,
        options: { ...difficulties[0] },
      };
    }

    case "toggleAutoDifficulty": {
      if (state.autoDifficulty)
        return {
          ...state,
          autoDifficulty: false,
          options: { ...defaultState.options },
        };

      return {
        ...state,
        autoDifficulty: true,
        options: difficulties[state.difficulty],
      };
    }

    case "updateResult": {
      const { difficulty, autoDifficulty, result } = state;
      const {
        offset,
        size,
        cursorOffset,
        cursorSize,
        perfectOffset,
        perfectSize,
      } = action;

      switch (result) {
        case "start": {
          const range = (offset: number, size: number) => {
            const start = offset % 360;
            const end = (offset + size) % 360;
            return [start, end];
          };
          const cursorRange = range(cursorOffset, cursorSize);

          if (compareRange(cursorRange, range(perfectOffset, perfectSize)))
            return { ...state, result: "perfect" };
          else if (compareRange(cursorRange, range(offset, size)))
            return { ...state, result: "ok" };

          return { ...state, result: "fail" };
        }

        default:
        case "perfect":
        case "ok":
        case "fail": {
          const newDifficulty = !autoDifficulty
            ? 0
            : Math.min(difficulties.length - 1, difficulty + 1);
          return {
            ...state,
            result: "start",
            cursor: 0,
            difficulty: newDifficulty,
            options: !autoDifficulty
              ? state.options
              : difficulties[newDifficulty],
            offset: (300 + Math.random() * 160) % 360,
          };
        }
      }
    }

    case "newFrame": {
      const fps = 1000 / action.deltaTime;
      const lasts = state.fpsCounter.lasts;

      return {
        ...state,
        cursor:
          state.cursor +
          (!action.running ? 0 : action.deltaTime * 0.36 * state.options.speed),
        fpsCounter:
          lasts.length < 30
            ? { lasts: [...lasts, fps], label: state.fpsCounter.label }
            : {
                lasts: [],
                label: (
                  "" +
                  Math.floor(
                    lasts.reduce((prev, curr) => prev + curr, 0) / lasts.length,
                  )
                ).padStart(3, "0"),
              },
      };
    }

    default: {
      throw new Error("Unexpected action type");
    }
  }
}
