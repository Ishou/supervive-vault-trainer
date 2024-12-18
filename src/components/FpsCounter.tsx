import { useState } from "react";
import { useAnimationLoop } from "./UseAnimationLoop";

export default function FpsCounter() {
  const formatFps = (fps: number) => ("" + Math.floor(fps)).padStart(3, "0");

  const [frames, setFrames] = useState({
    count: 0,
    elapsedTime: 0,
    fps: 0,
  });

  if (frames.elapsedTime >= 1000)
    setFrames({
      count: 0,
      elapsedTime: 0,
      fps: frames.count * (1000 / frames.elapsedTime),
    });

  useAnimationLoop((delta) => {
    setFrames((frames) => {
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
