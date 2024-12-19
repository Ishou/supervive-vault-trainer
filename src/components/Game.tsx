import LockPicker from "./LockPicker/LockPicker";
import { useAnimationLoop } from "./UseAnimationLoop";
import { useGameDispatch } from "./GameOptions/GameContext";

export default function Game() {
  const gameDispatch = useGameDispatch();

  useAnimationLoop((delta) => {
    gameDispatch({
      type: "newGameFrame",
      delta: delta,
    });
  });

  return <LockPicker />;
}
