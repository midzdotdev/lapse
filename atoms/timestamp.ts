import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, useAtom, useSetAtom } from "jotai";
import {
  atomWithStorage,
  createJSONStorage,
  unwrap,
  unstable_withStorageValidator as withStorageValidator,
} from "jotai/utils";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";

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
  await set(storedTimestampAtom, Date.now());
});

const unwrappedStoredTimestampAtom = unwrap(storedTimestampAtom);

export const useTimestamp = () => {
  const [value] = useAtom(unwrappedStoredTimestampAtom);

  useEffect(() => {
    console.log("timestamp changed", value);
  }, [value]);

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

      const time = new Date().toTimeString();
      console.log(
        time,
        `App state changed from ${prevState.current} to ${state}`
      );

      const message = `App state changed from ${prevState.current} to ${state}`;
      setTimeout(() => {
        console.log(time, message);
      }, 2000);

      if (
        prevState.current.match(/inactive|background/) &&
        state === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      if (prevState.current.match(/active/) && state === "background") {
        console.log("App is going to background");

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
