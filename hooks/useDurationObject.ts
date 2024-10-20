import { useMemo } from "react";
import { Unit, unitsDesc, unitsValue } from "../constants";
import { useNow } from "./useNow";

export type DurationObject = Record<Unit, number>;

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

const parseDurationObject = (durationMillis: number): DurationObject => {
  const durationObject: DurationObject = {} as DurationObject;

  for (const unit of unitsDesc) {
    const unitMillis = unitsValue[unit];
    const unitValue = Math.floor(durationMillis / unitMillis);
    durationObject[unit] = unitValue;
    durationMillis -= unitValue * unitMillis;
  }

  return durationObject;
};
