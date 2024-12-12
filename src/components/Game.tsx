import React, { useRef, useState } from "react";
import PlayStopTrigger from "@/components/PlayStopTrigger";
import GameResult, { GameResults } from "@/components/GameResult";
import GameOptions, {
  GameDifficulties,
  GameDifficulty,
} from "@/components/GameOptions";
import LockPicker from "@/components/LockPicker";
import FpsCounter from "@/components/FpsCounter";
import compareRange from "@/utils/arc-compare";

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
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<GameResults>("start");
  const [difficulty, setDifficulty] = useState<GameDifficulty>({
    ...GameDifficulties[0],
  });

  const dataHandler = (
    _perfectOffset: number,
    _perfectSize: number,
    _cursorOffset: number,
  ) => {
    perfectOffset.current = _perfectOffset;
    perfectSize.current = _perfectSize;
    cursorOffset.current = _cursorOffset;
  };

  const toggleRunning = () => {
    if (running && result === "start") {
      const range = (offset: number, size: number): [number, number] => {
        const start = offset % 360;
        const end = (offset + size) % 360;
        return [start, end];
      };
      const cursorRange = range(cursorOffset.current, cursorSize);
      const perfectRange = range(perfectOffset.current, perfectSize.current);
      const okRange = range(offset, difficulty.size);

      if (compareRange(cursorRange, perfectRange)) setResult("perfect");
      else if (compareRange(cursorRange, okRange)) setResult("ok");
      else setResult("fail");

      setRunning(false);
    } else if (!running && result !== "start") {
      setOffset((300 + Math.random() * 160) % 360);
      setResult("start");
      if (difficulty.level !== undefined)
        setDifficulty(
          GameDifficulties[
            Math.min(GameDifficulties.length - 1, difficulty.level + 1)
          ],
        );
    } else setRunning(true);
  };

  return (
    <div className="grid grid-cols-2 gap-8 mx-4" data-cy="game">
      <div className="col-span-2 my-auto flex flex-col xl:col-span-1">
        <div className="flex flex-col justify-center">
          <GameResult result={result} />

          <LockPicker
            radius={radius}
            width={width}
            isRunning={running}
            isGameEnd={!running && result === "start"}
            difficulty={difficulty}
            okOffset={offset}
            cursorStart={cursorStart}
            cursorSize={cursorSize}
            dataHandler={dataHandler}
          />

          <PlayStopTrigger toggleHandler={toggleRunning} />
          <FpsCounter />
        </div>
      </div>

      <div className="col-span-2 xl:col-span-1 flex flex-col gap-4">
        <GameOptions
          difficulty={difficulty}
          changeHandler={(difficulty) => setDifficulty(difficulty)}
        />
      </div>
    </div>
  );
}
