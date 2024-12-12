import Arc from "@/components/Arc";
import React, { useEffect, useState } from "react";
import { GameDifficulty } from "@/components/GameOptions";
import { useAnimationLoop } from "@/components/FpsCounter";

type Props = {
  radius: number;
  width: number;
  okOffset: number;
  difficulty: GameDifficulty;
  cursorStart: number;
  cursorSize: number;
  isRunning: boolean;
  isGameEnd: boolean;
  dataHandler: (
    perfectOffset: number,
    perfectSize: number,
    cursorOffset: number,
  ) => void;
};

export default function LockPicker(props: Props) {
  const {
    radius,
    width,
    okOffset,
    difficulty,
    cursorStart,
    cursorSize,
    isRunning,
    isGameEnd,
    dataHandler,
  } = props;

  const initialCursorOffset = cursorStart - cursorSize / 2;
  const perfectSize = (difficulty.size * difficulty.perfectMultiplier) / 100;
  const perfectOffset = okOffset + difficulty.size / 2 - perfectSize / 2;

  const [cursorOffset, setCursorOffset] = useState(initialCursorOffset);

  dataHandler(perfectOffset, perfectSize, cursorOffset);

  useAnimationLoop((delta) => {
    setCursorOffset((cursorOffset) =>
      !isRunning
        ? cursorOffset
        : cursorOffset + delta * 0.36 * difficulty.speed,
    );
  });

  useEffect(() => {
    if (isGameEnd) {
      setCursorOffset(initialCursorOffset);
    }
  }, [isGameEnd, initialCursorOffset]);

  return (
    <svg
      data-cy="lock-picker"
      className="mx-auto"
      width={radius * 4}
      height={radius * 4}
      viewBox={`${-radius * 2} ${-radius * 2} ${radius * 4} ${radius * 4}`}
    >
      {/* Track */}
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
        offset={cursorOffset}
        size={cursorSize}
        radius={radius}
        width={width}
      />
    </svg>
  );
}
