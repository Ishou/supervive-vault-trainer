import { useCallback, useEffect, useRef } from "react";

export function useAnimationLoop(callback: (delta: number) => void) {
  const requestId = useRef(0);
  const lastTime = useRef(performance.now());

  const cb = useCallback(callback, [callback]);

  const doRequestRef = useCallback(() => {
    const now = performance.now();
    cb(now - lastTime.current);
    lastTime.current = now;
    requestId.current = setTimeout(doRequestRef, 2);
  }, [cb]);

  useEffect(() => {
    requestId.current = setTimeout(doRequestRef, 2);

    return () => clearTimeout(requestId.current);
  }, [doRequestRef]);
}
