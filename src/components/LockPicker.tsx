import Arc from "@/components/Arc";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import LockPickerResultAlert from "@/components/LockPickerResultAlert";
import { Button, Kbd } from "@nextui-org/react";
import {
  LockPickerContext,
  LockPickerDispatchContext,
} from "@/components/LockPickerContext";

export interface LockPickerProps {
  radius?: number;
  width?: number;
}

const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]);
};

export default function LockPicker(props: LockPickerProps) {
  const state = useContext(LockPickerContext);
  const dispatch = useContext(LockPickerDispatchContext);

  const [running, setRunning] = useState(false);

  const { radius = 64, width = 10 } = props;

  const { result, offset, cursor, fpsCounter, options } = state;

  const size = options.size;
  const perfectMultiplier = options.perfectMultiplier;

  const perfectSize = (size * perfectMultiplier) / 100;
  const perfectOffset = offset + size / 2 - perfectSize / 2;

  const cursorSize = 3;
  const cursorOffset = 180 + cursor - cursorSize / 2;

  useAnimationFrame((deltaTime: number) => {
    dispatch({
      type: "newFrame",
      deltaTime,
      running,
    });
  });

  const toggleRunning = () => {
    setRunning((running) => {
      return result !== "start" ? false : !running;
    });

    // Stopping cursor and updating result alert
    if (result !== "start" || running) {
      dispatch({
        type: "updateResult",
        offset,
        size,
        cursorOffset,
        cursorSize,
        perfectOffset,
        perfectSize,
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "KeyE") return;
      event.preventDefault();

      toggleRunning();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div data-cy="lock-picker" className="flex flex-col justify-center">
      <LockPickerResultAlert type={result} />

      <svg
        className="mx-auto"
        width={radius * 4}
        height={radius * 4}
        viewBox={`${-radius * 2} ${-radius * 2} ${radius * 4} ${radius * 4}`}
      >
        {/* Track */}
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
          offset={offset}
          angle={size}
          radius={radius}
        />
        {/* Perfect Range */}
        <Arc
          data-cy="lock-picker-perfect"
          className="stroke-green-300"
          offset={perfectOffset}
          angle={perfectSize}
          radius={radius}
        />
        {/* Cursor */}
        <Arc
          data-cy="lock-picker-cursor"
          className="stroke-yellow-500"
          offset={cursorOffset}
          angle={cursorSize}
          radius={radius}
        />
      </svg>

      <div className="mx-auto">
        <Button color="primary" size="lg" onTouchEnd={toggleRunning}>
          Press <Kbd>E</Kbd> or Tap
        </Button>
        <div className="text-center mt-2">FPS: {fpsCounter.label}</div>
      </div>
    </div>
  );
}
