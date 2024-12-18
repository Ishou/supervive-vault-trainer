import { useRef, useState } from "react";
import PlayStopTrigger from "./PlayStopTrigger";
import GameResult, { GameResults } from "./GameResult";
import GameOptionsForm, { GameOptions } from "./GameOptionsForm";
import LockPicker from "./LockPicker";
import FpsCounter from "./FpsCounter";
import compareRange from "../utils/arc-compare";
import { GameDifficulties, GameDifficulty } from "./GameDifficulties";

type Props = {
  radius?: number;
  width?: number;
  cursorStart?: number;
  cursorSize?: number;
};

export default function Game(props: Props) {
  const { radius = 64, width = 10, cursorStart = 180, cursorSize = 3 } = props;

  const perfectOffset = useRef<number>(0);
  const perfectSize = useRef<number>(0);
  const cursorOffset = useRef<number>(0);

  const [offset, setOffset] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<GameResults>("start");
  const [cursorStartOffset, setCursorStartOffset] = useState(cursorStart);
  const [options, setOptions] = useState<GameOptions>({
    withCountdown: true,
  });
  const [difficulty, setDifficulty] = useState<GameDifficulty>({
    ...GameDifficulties[0],
  });
  const isGameStart = !isRunning && result === "start";

  const dataHandler = (
    _perfectOffset: number,
    _perfectSize: number,
    _cursorOffset: number,
  ) => {
    perfectOffset.current = _perfectOffset;
    perfectSize.current = _perfectSize;
    cursorOffset.current = _cursorOffset;
  };

  const gameStartHandler = () => {
    setCursorStartOffset(cursorStart - cursorSize / 2 - cursorOffset.current);
    setOffset((300 + Math.random() * 160) % 360);
    setResult("start");
    setIsRunning(true);
    if (difficulty.level !== undefined)
      setDifficulty(
        GameDifficulties[
          Math.min(GameDifficulties.length - 1, difficulty.level + 1)
        ],
      );
  };

  const toggleRunning = () => {
    if (isRunning && result === "start") {
      const range = (offset: number, size: number): [number, number] => {
        const start = offset % 360;
        const end = (offset + size) % 360;
        return [start, end];
      };
      const cursorRange = range(
        cursorStartOffset + cursorOffset.current,
        cursorSize,
      );
      const perfectRange = range(perfectOffset.current, perfectSize.current);
      const okRange = range(offset, difficulty.size);

      if (compareRange(cursorRange, perfectRange)) setResult("perfect");
      else if (compareRange(cursorRange, okRange)) setResult("ok");
      else setResult("fail");

      setIsRunning(false);
    } else if (!isRunning && result !== "start") {
      if (!options.withCountdown) gameStartHandler();
    } else setIsRunning(true);
  };

  return (
    <div className="grid grid-cols-2 gap-8 mx-4" data-cy="game">
      <div className="col-span-2 my-auto flex flex-col xl:col-span-1">
        <div className="flex flex-col justify-center">
          <GameResult result={result} />

          <LockPicker
            radius={radius}
            width={width}
            withCountdown={options.withCountdown}
            isRunning={isRunning}
            isGameStart={isGameStart}
            difficulty={difficulty}
            okOffset={offset}
            cursorStart={cursorStartOffset}
            cursorSize={cursorSize}
            dataHandler={dataHandler}
            countdownHandler={gameStartHandler}
          />

          <PlayStopTrigger toggleHandler={toggleRunning} />
          <FpsCounter />
        </div>
      </div>

      <div className="col-span-2 xl:col-span-1 flex flex-col gap-4">
        <GameOptionsForm
          options={options}
          optionsChangeHandler={(options) => setOptions(options)}
          difficulty={difficulty}
          difficultyChangeHandler={(difficulty) => setDifficulty(difficulty)}
        />
      </div>
    </div>
  );
}
