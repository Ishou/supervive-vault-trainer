type Props = {
  maxRadius: number;
  totalTime: number;
  percent: number;
};

export default function CircleCountDown(props: Props) {
  const { maxRadius, percent, totalTime } = props;

  const radius = maxRadius * percent;
  const timer = ("" + Math.floor(totalTime * (1 - percent)) / 1000).padEnd(
    5,
    "0",
  );

  return (
    <g textAnchor="middle" dominantBaseline="middle" data-cy="game-countdown">
      <circle r={radius} className="fill-green-400" />
      <text className="fill-white stroke-black stroke-[2.5]">{timer}</text>
      <text className="fill-white stroke-white stroke-[0.1]">{timer}</text>
    </g>
  );
}
