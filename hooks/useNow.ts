import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useInterval } from "./useInterval";

const NOW_REFRESH_INTERVAL = 1000;

export const useNow = (): number => {
  const [now, setNow] = useState<number>(Date.now());

  const updateNow = useCallback(() => {
    setNow(Date.now());
  }, []);

  useInterval(updateNow, NOW_REFRESH_INTERVAL);

  return now;
};
