import { SVGProps } from "react";

export interface ArcProps extends SVGProps<SVGPathElement> {
  offset: number;
  size: number;
  radius: number;
  width: number;
}

export default function Arc(props: ArcProps) {
  const { offset, size, radius, width, ...otherProps } = props;
  const compute = (angle: number) => ({
    x: radius * Math.sin((angle * Math.PI) / 180.0),
    y: -radius * Math.cos((angle * Math.PI) / 180.0),
  });

  const flip = size % 360 > 180 ? 1 : 0;
  const start = compute(offset);
  const end = compute(offset + size);

  return (
    <>
      <path
        {...otherProps}
        d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${flip} 1 ${end.x} ${end.y}`}
        fill="none"
        strokeWidth={width}
      />
    </>
  );
}
