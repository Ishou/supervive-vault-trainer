import { SVGProps } from "react";

type ArcProps = SVGProps<SVGPathElement> & {
  offset?: number;
  angle: number;
  radius: number;
  width?: number;
};

export default function Arc(props: ArcProps) {
  const { offset = 0, angle, radius, width = 10 } = props;
  const compute = (angle: number) => ({
    x: radius * Math.sin((angle * Math.PI) / 180.0),
    y: -radius * Math.cos((angle * Math.PI) / 180.0),
  });

  const flip = angle % 360 > 180 ? 1 : 0;
  const start = compute(offset);
  const end = compute(offset + angle);

  return (
    <>
      <path
        {...props}
        d={`M ${start.x} ${start.y}
            A ${radius} ${radius} 0 ${flip} 1 ${end.x} ${end.y}`}
        fill="none"
        strokeWidth={width}
      />
    </>
  );
}
