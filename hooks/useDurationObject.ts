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

  return durationObject;
};

const DURATION_UNIT_VALUES: Record<keyof DurationObject, number> = (() => {
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  return { days, hours, minutes, seconds };
})();

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
