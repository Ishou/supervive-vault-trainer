import Arc from "./Arc";
import { useGameState } from "../GameOptions/GameContext";
import { useGameOptions } from "../GameOptions/GameOptionsContext";

export default function Cursor() {
  const options = useGameOptions();
  const game = useGameState();
  const { radius, width, cursorSize } = options;

  return (
    <Arc
      data-cy="lock-picker-cursor"
      className="stroke-yellow-500"
      offset={game.cursorOffset}
      size={cursorSize}
      radius={radius}
      width={width}
    />
  );
}
