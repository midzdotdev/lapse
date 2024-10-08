import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const LAST_USED_EPOCH_KEY = "lastClosedAt";

export const useLastUsedStorage = (): [
  lastUsed: number | null,
  reset: () => void
] => {
  const [lastUsed, setLastUsed] = useState<number | null>(null);

  const reset = useCallback(async () => {
    const now = Date.now();
    setLastUsed(() => now);
    await AsyncStorage.setItem(LAST_USED_EPOCH_KEY, `${now}`);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(LAST_USED_EPOCH_KEY).then(async (value) => {
      const intValue = value !== null ? safeParseInt(value) : null;

      if (intValue === null) {
        await reset();
        return;
      }

      setLastUsed(intValue);
    });
  }, []);

  return [lastUsed, reset];
};

const safeParseInt = (value: string): number | null => {
  const parsed = parseInt(value);

  return Number.isInteger(parsed) ? null : parsed;
};
