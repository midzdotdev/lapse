import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, useAtom, useSetAtom } from "jotai";
import {
  atomWithStorage,
  createJSONStorage,
  unwrap,
  unstable_withStorageValidator as withStorageValidator,
} from "jotai/utils";
import { useEffect, useMemo, useRef } from "react";
import { AppState } from "react-native";

const OVERRIDE_TIME_AGO = null;
// process.env.NODE_ENV === "development"
//   ? 24 * 60 * 60 * 1000 - 10 * 1000
//   : null;

const asyncStorage = createJSONStorage(() => AsyncStorage);

const storedTimestampAtom = atomWithStorage(
  "reset-timestamp",
  Date.now(),
  withStorageValidator(
    (value): value is number => typeof value === "number" && value <= Date.now()
  )(asyncStorage),
  {
    getOnInit: true,
  }
);

const resetTimestampAtom = atom(null, async (_, set) => {
  console.log("resetting timestamp");

  const newValue = OVERRIDE_TIME_AGO
    ? Date.now() - OVERRIDE_TIME_AGO
    : Date.now();

  await set(storedTimestampAtom, newValue);
});

const unwrappedStoredTimestampAtom = unwrap(storedTimestampAtom);

export const useTimestamp = () => {
  const [storedValue] = useAtom(unwrappedStoredTimestampAtom);

  useEffect(() => {
    console.log("stored timestamp changed", storedValue);
  }, [storedValue]);

  const value = useMemo(() => {
    if (OVERRIDE_TIME_AGO) {
      return Date.now() - OVERRIDE_TIME_AGO;
    }

    return storedValue;
  }, [storedValue]);

  return value;
};

export const useResetTimestampOnBlur = () => {
  const prevState = useRef(AppState.currentState);
  const resetTimestamp = useSetAtom(resetTimestampAtom);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (state) => {
      if (state === prevState.current) {
        return;
      }

      console.log(`App state changed from ${prevState.current} to ${state}`);

      if (prevState.current.match(/active/) && state === "background") {
        try {
          await resetTimestamp();

          console.log("Reset timestamp");
        } catch (error) {
          console.log("Error resetting before backgrounded: ", error);
        }
      }

      prevState.current = state;

      return () => {
        console.log("subscription removed");
        subscription.remove();
      };
    });
  }, []);
};
