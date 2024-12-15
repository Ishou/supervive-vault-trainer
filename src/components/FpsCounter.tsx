import { useState } from "react";
import { useAnimationLoop } from "./UseAnimationLoop";

export default function FpsCounter() {
  const formatFps = (fps: number) => ("" + Math.floor(fps)).padStart(3, "0");

  const [frames, setFrames] = useState({
    count: 0,
    elapsedTime: 0,
    fps: 0,
  });

  useAnimationLoop((delta) => {
    setFrames((frames) => {
      if (frames.elapsedTime + delta >= 1000)
        return {
          count: 0,
          elapsedTime: 0,
          fps: frames.count * (1000 / frames.elapsedTime),
        };

      return {
        count: frames.count + 1,
        elapsedTime: frames.elapsedTime + delta,
        fps: frames.fps,
      };
    });
  });

  return (
    <div data-cy="fps-counter" className="text-center mt-2">
      FPS: {formatFps(frames.fps)}
    </div>
  );
}
