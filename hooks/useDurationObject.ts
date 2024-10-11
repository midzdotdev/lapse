import { useMemo } from "react";
import { useNow } from "./useNow";

export interface DurationObject {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

export const useDurationObject = (
  sinceTimestamp: number | null
): DurationObject | null => {
  const now = useNow();

  const durationObject = useMemo(
    () =>
      sinceTimestamp !== null
        ? parseDurationObject(now - sinceTimestamp)
        : null,
    [now, sinceTimestamp]
  );

  // For the love of God...
  // Somebody please tell me why sinceTimestamp is sometimes 2 days into the future
  if (sinceTimestamp && sinceTimestamp > now) {
    return null;
  }

  return durationObject;
};

const DURATION_UNIT_VALUES: Record<keyof DurationObject, number> = (() => {
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  return { days, hours, minutes, seconds };
})();

export type Unit = keyof typeof DURATION_UNIT_VALUES;
export const unitsDesc = Object.keys(DURATION_UNIT_VALUES) as Unit[];

const parseDurationObject = (durationMillis: number): DurationObject => {
  const durationObject: DurationObject = {} as DurationObject;

  for (const [unit, unitMillis] of Object.entries(DURATION_UNIT_VALUES) as [
    keyof DurationObject,
    number
  ][]) {
    const unitValue = Math.floor(durationMillis / unitMillis);
    durationObject[unit] = unitValue;
    durationMillis -= unitValue * unitMillis;
  }

  return durationObject;
};
