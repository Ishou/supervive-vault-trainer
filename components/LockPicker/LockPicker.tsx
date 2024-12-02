import Arc from "@/components/LockPicker/Arc";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LockPickerOptions } from "@/components/LockPicker/LockPickerOptionList";
import { Button, Chip, Typography } from "@mui/material";
import LockPickerAlert from "@/components/LockPickerAlert";

const types = ["perfect", "ok", "fail", "start"] as const;
export type LockPickerResult = (typeof types)[number];

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
  const [fps, setFps] = useState(0);
  const { radius = 48, options } = props;
  const width = 10;

  const perfectSize = (options.size * options.perfectSize) / 100;
  const perfectOffset = offset + options.size / 2 - perfectSize / 2;

  const cursorSize = 3;
  const cursorOffset = (180 + cursor - cursorSize / 2) % 360;

  useAnimationFrame((deltaTime: number) => {
    setFps(Math.floor(1000 / deltaTime));
    if (running)
      setCursor((prevCount) => prevCount + deltaTime * (0.36 * options.speed));
  });

  const toggleRunning = useCallback(() => {
    if (result === "start") {
      if (running) {
        const range = (offset: number, size: number) => {
          const start = offset % 360;
          const end = (offset + size) % 360;
          if (start < 0 && end < 0) return [start + 360, end + 360, size];
          return [start, end, size];
        };
        const compareRange = (r1: number[], r2: number[]) => {
          const delta = -Math.max(r1[0], r2[0]);
          r1 = range(r1[0] + delta, r1[2]);
          r2 = range(r2[0] + delta, r2[2]);
          return r1[0] <= r2[1] && r1[1] >= r2[0];
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
  }, [running, result, cursor]);

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
        <Button
          color="primary"
          variant="contained"
          size="large"
          disabled
          endIcon={
            <Chip
              label="E"
              color="secondary"
              size="small"
              sx={{ borderRadius: "4px" }}
            />
          }
        >
          Press
        </Button>
        <Typography className="text-center">
          FPS: {("" + fps).padStart(3, "0")}
        </Typography>
      </div>
    </>
  );
}
