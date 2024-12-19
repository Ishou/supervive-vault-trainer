import Arc from "./Arc";
import CircleCountDown from "./CircleCountDown";
import Cursor from "./Cursor";
import { useGameOptions } from "../GameOptions/GameOptionsContext";

export default function LockPicker() {
  const { radius, width, difficulty } = useGameOptions();

  return (
    <svg
      data-cy="lock-picker"
      className="mx-auto"
      width={radius * 4}
      height={radius * 4}
      viewBox={`${-radius * 2} ${-radius * 2} ${radius * 4} ${radius * 4}`}
    >
      {/* Track */}
      <CircleCountDown />
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
        offset={difficulty.okOffset}
        size={difficulty.okSize}
        radius={radius}
        width={width}
      />
      {/* Perfect Range */}
      <Arc
        data-cy="lock-picker-perfect"
        className="stroke-green-300"
        offset={difficulty.perfectOffset}
        size={difficulty.perfectSize}
        radius={radius}
        width={width}
      />
      {/* Cursor */}
      <Cursor />
    </svg>
  );
}
