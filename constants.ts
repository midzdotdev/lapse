export const TICKER_ANIMATION_DURATION = 700;

export const unitsValue = (() => {
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  return { days, hours, minutes, seconds } satisfies Record<string, number>;
})();

export type Unit = keyof typeof unitsValue;
export const unitsDesc = (Object.keys(unitsValue) as Unit[]).sort(
  (a, b) => unitsValue[b] - unitsValue[a]
);
