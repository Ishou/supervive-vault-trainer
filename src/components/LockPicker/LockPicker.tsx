import Arc from "@/components/LockPicker/Arc";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LockPickerOptions } from "@/components/LockPicker/LockPickerOptionList";
import LockPickerAlert from "@/components/LockPickerAlert";
import compareRange from "@/../utils/arc-compare";
import { Button, Kbd } from "@nextui-org/react";

export type LockPickerResult = "perfect" | "ok" | "fail" | "start";

export interface LockPickerProps {
  options: LockPickerOptions;
  radius?: number;
}

const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};

export default function LockPicker(props: LockPickerProps) {
  const [result, setResult] = useState<LockPickerResult>("start");
  const [running, setRunning] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [offset, setOffset] = useState(0);
  const [fps, setFps] = useState({
    last: [] as number[],
    fps: "000",
  });
  const { radius = 48, options } = props;
  const width = 10;

  const perfectSize = (options.size * options.perfectSize) / 100;
  const perfectOffset = offset + options.size / 2 - perfectSize / 2;

  const cursorSize = 3;
  const cursorOffset = (180 + cursor - cursorSize / 2) % 360;

  useAnimationFrame((deltaTime: number) => {
    setFps((prevFps) => {
      const fps = 1000 / deltaTime;
      const last = [...prevFps.last].concat([fps]);
      if (last.length < 30) return { last, fps: prevFps.fps };
      return {
        last: [],
        fps: (
          "" +
          Math.floor(last.reduce((prev, curr) => prev + curr, 0) / last.length)
        ).padStart(3, "0"),
      };
    });
    if (running)
      setCursor((prevCount) => prevCount + deltaTime * (0.36 * options.speed));
  });

  const toggleRunning = useCallback(() => {
    if (result === "start") {
      if (running) {
        const range = (offset: number, size: number) => {
          const start = offset % 360;
          const end = (offset + size) % 360;
          return [start, end];
        };
        const cursorRange = range(cursorOffset, cursorSize);

        if (compareRange(cursorRange, range(perfectOffset, perfectSize)))
          setResult("perfect");
        else if (compareRange(cursorRange, range(offset, options.size)))
          setResult("ok");
        else setResult("fail");
      }

      setRunning(!running);
    } else {
      setResult("start");
      setCursor(0);
      setOffset((300 + Math.random() * 160) % 360);
    }
  }, [
    result,
    running,
    cursorOffset,
    perfectOffset,
    perfectSize,
    offset,
    options.size,
  ]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code !== "KeyE") return;
      event.preventDefault();

      toggleRunning();
    },
    [toggleRunning],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <LockPickerAlert type={result} />

      <div className="mx-auto">
        <svg
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
          {/* OK range */}
          <Arc
            className="stroke-green-700"
            offset={offset}
            angle={options.size}
            radius={radius}
          />
          {/* Perfect Range */}
          <Arc
            className="stroke-green-300"
            offset={perfectOffset}
            angle={perfectSize}
            radius={radius}
          />
          {/* Cursor */}
          <Arc
            className="stroke-orange-500"
            offset={cursorOffset}
            angle={cursorSize}
            radius={radius}
          />
        </svg>
      </div>
      <div className="mx-auto">
        <Button color="primary" size="lg" onTouchStart={toggleRunning}>
          Press <Kbd>E</Kbd> or Tap
        </Button>
        <div className="text-center mt-2">FPS: {fps.fps}</div>
      </div>
    </>
  );
}
