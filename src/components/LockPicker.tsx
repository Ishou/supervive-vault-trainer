import Arc from "./Arc";
import { useEffect, useState } from "react";

import { useAnimationLoop } from "./UseAnimationLoop";
import CircleCountDown from "./CircleCountDown";
import { GameDifficulty } from "./GameDifficulties";

type Props = {
  radius: number;
  width: number;
  okOffset: number;
  difficulty: GameDifficulty;
  cursorStart: number;
  cursorSize: number;
  withCountdown: boolean;
  isRunning: boolean;
  isGameStart: boolean;
  dataHandler: (
    perfectOffset: number,
    perfectSize: number,
    cursorOffset: number,
  ) => void;
  countdownHandler: () => void;
};

export default function LockPicker(props: Props) {
  const {
    radius,
    width,
    okOffset,
    difficulty,
    cursorStart,
    cursorSize,
    withCountdown,
    isRunning,
    isGameStart,
    dataHandler,
    countdownHandler,
  } = props;

  const perfectSize = (difficulty.size * difficulty.perfectMultiplier) / 100;
  const perfectOffset = okOffset + difficulty.size / 2 - perfectSize / 2;

  const [timer, setTimer] = useState(0);
  const [cursorOffset, setCursorOffset] = useState(0);
  const countdownTimer = 1000;

  dataHandler(perfectOffset, perfectSize, cursorOffset);

  if (!withCountdown && timer) setTimer(0);

  useAnimationLoop((delta) => {
    if (isGameStart) {
      setCursorOffset((cursorOffset) =>
        !isRunning
          ? cursorOffset
          : cursorOffset + delta * 0.36 * difficulty.speed,
      );
    } else if (withCountdown) {
      if (timer + delta >= countdownTimer) {
        countdownHandler();
        setTimer(0);
      } else setTimer((timer) => timer + delta);
    }
  });

  useEffect(() => {
    if (isGameStart) {
      setCursorOffset(0);
    }
  }, [isGameStart]);

  return (
    <svg
      data-cy="lock-picker"
      className="mx-auto"
      width={radius * 4}
      height={radius * 4}
      viewBox={`${-radius * 2} ${-radius * 2} ${radius * 4} ${radius * 4}`}
    >
      {/* Track */}
      {!isRunning && !isGameStart && withCountdown ? (
        <CircleCountDown
          maxRadius={radius - width / 2}
          totalTime={countdownTimer}
          percent={timer / countdownTimer}
        />
      ) : (
        <></>
      )}
      <circle
        r={radius}
        className="stroke-black"
        fill="none"
        strokeWidth={width}
      ></circle>
      {/* OK range */}
      <Arc
        data-cy="lock-picker-ok"
        className="stroke-green-700"
        offset={okOffset}
        size={difficulty.size}
        radius={radius}
        width={width}
      />
      {/* Perfect Range */}
      <Arc
        data-cy="lock-picker-perfect"
        className="stroke-green-300"
        offset={perfectOffset}
        size={perfectSize}
        radius={radius}
        width={width}
      />
      {/* Cursor */}
      <Arc
        data-cy="lock-picker-cursor"
        className="stroke-yellow-500"
        offset={cursorStart + cursorOffset}
        size={cursorSize}
        radius={radius}
        width={width}
      />
    </svg>
  );
}
