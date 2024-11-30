import Arc from "@/components/LockPicker/Arc";
import { SVGProps } from "react";

export interface LockPickerProps extends SVGProps<SVGSVGElement> {
  cursor: number;
  speed?: number;
  offset: number;
  size: number;
  accuracy: number;
  radius?: number;
}

export default function LockPicker(props: LockPickerProps) {
  const { radius = 48, offset = 0, size, accuracy, cursor } = props;
  const width = 10;

  const accurateAngle = (size * accuracy) / 100;
  const accurateOffsetAngle = size / 2 - accurateAngle / 2;

  const cursorAngle = 3;
  const cursorOffset = (180 + cursor - cursorAngle / 2) % 360;

  return (
    <>
      <svg
        {...props}
        width={radius * 4}
        height={radius * 4}
        viewBox={`${-radius * 2} ${-radius * 2} ${radius * 4} ${radius * 4}`}
      >
        {/* Track */}
        <circle
          r={radius}
          className="stroke-gray-500"
          fill="none"
          strokeWidth={width}
        ></circle>
        {/* Inaccurate range */}
        <Arc
          className="stroke-green-700"
          offset={offset}
          angle={size}
          radius={radius}
        />
        {/* Accurate Range */}
        <Arc
          className="stroke-green-300"
          offset={offset + accurateOffsetAngle}
          angle={accurateAngle}
          radius={radius}
        />
        {/* Cursor */}
        <Arc
          className="stroke-orange-500"
          offset={cursorOffset}
          angle={cursorAngle}
          radius={radius}
        />
      </svg>
    </>
  );
}
