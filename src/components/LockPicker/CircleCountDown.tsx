import { useGameState } from "../GameOptions/GameContext";
import { useGameOptions } from "../GameOptions/GameOptionsContext";

export default function CircleCountDown() {
  const options = useGameOptions();
  const game = useGameState();

  const countdownTimer = 1000;
  const maxRadius = options.radius - options.width / 2;
  const percent = game.timer / countdownTimer;
  const radius = maxRadius * percent;

  const formattedTimer =
    percent === 0 || percent === 1
      ? ""
      : ("" + Math.floor(countdownTimer * (1 - percent)) / 1000).padEnd(5, "0");

  return (
    <g textAnchor="middle" dominantBaseline="middle" data-cy="game-countdown">
      <circle r={radius} className="fill-green-400" />
      <text className="fill-white stroke-black stroke-[2.5]">
        {formattedTimer}
      </text>
      <text className="fill-white stroke-white stroke-[0.1]">
        {formattedTimer}
      </text>
    </g>
  );
}
