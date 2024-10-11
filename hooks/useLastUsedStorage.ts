import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { DEV_CONSTANTS } from "../constants-dev";

const LAST_USED_EPOCH_KEY = "lastClosedAt";

export const useLastUsedStorage = (): ReturnType<
  typeof _useLastUsedStorage
> => {
  if (DEV_CONSTANTS.FORCE_INITIAL_DURATION !== null) {
    const [lastUsed, setLastUsed] = useState<number>(
      Date.now() - DEV_CONSTANTS.FORCE_INITIAL_DURATION
    );

    const reset = useCallback(() => {
      setLastUsed(Date.now() - DEV_CONSTANTS.FORCE_INITIAL_DURATION!);
    }, []);

    return [lastUsed, reset];
  }

  return _useLastUsedStorage();
};

const _useLastUsedStorage = (): [
  lastUsed: number | null,
  reset: () => void
] => {
  const [lastUsed, setLastUsed] = useState<number | null>(null);

  const reset = useCallback(async () => {
    if (DEV_CONSTANTS.FORCE_INITIAL_DURATION) {
      setLastUsed(Date.now() - DEV_CONSTANTS.FORCE_INITIAL_DURATION!);
      return;
    }

    setLastUsed(Date.now());
    await AsyncStorage.setItem(LAST_USED_EPOCH_KEY, `${Date.now()}`);
  }, []);

  // On first load, load last-used timestamp from storage
  useEffect(() => {
    AsyncStorage.getItem(LAST_USED_EPOCH_KEY).then(async (value) => {
      const intValue = value !== null ? safeParseInt(value) : null;

      if (intValue === null) {
        await reset();
        return;
      }

      setLastUsed(intValue);
    });
  }, [reset]);

  if (DEV_CONSTANTS.FORCE_INITIAL_DURATION) {
    return [Date.now() - DEV_CONSTANTS.FORCE_INITIAL_DURATION, reset];
  }

  return [lastUsed, reset];
};

const safeParseInt = (value: string): number | null => {
  const parsed = parseInt(value);

  return Number.isInteger(parsed) ? parsed : null;
};
