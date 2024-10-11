import { useCallback, useEffect, useState } from "react";
import { useInterval } from "./useInterval";

// An explanation to why useNow looks so complex...
// The delay argument for setInterval is the guarenteed minimum delay
// But because of the event loop, the callback can be delayed further
// Which in this app can occassionally result in ticking over by 2 seconds at a time
// When it happens, it looks buggy so we need to align the callback with the clock
// The alignment needs to be done everytime it's brought to the foreground (inc. first load)

export const useNow = (): number => {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    const now = Date.now();

    const intervalDelay = 1000 - (now % 1000);

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setNow(Date.now());
      });

      // schedule to be aligned with clock
    }, intervalDelay);

    return () => {
      clearTimeout(timeoutId);
      intervalId && clearInterval(intervalId);
    };
  }, []);

  return now;
};
