import React, { ComponentProps, useEffect, useState } from "react";
import { useLiveReduceMotion } from "../../../utils/reduce-motion";
import { DigitFadeTransition } from "./DigitFadeTransition";
import { DigitRollTransition } from "./DigitRollTransition";

export const AnimatedDigit = ({
  digit,
  ...transitioningDigitProps
}: {
  digit: number | null;
} & Omit<ComponentProps<typeof DigitFadeTransition>, "to" | "from">) => {
  const [{ from, to }, setActive] = useState<
    Pick<ComponentProps<typeof DigitFadeTransition>, "to" | "from">
  >({
    from: null,
    to: digit,
  });

  useEffect(() => {
    if (to === digit) return;

    setActive({ from: to, to: digit });
  }, [digit]);

  const reduceMotion = useLiveReduceMotion();

  const DigitTransition = reduceMotion
    ? DigitFadeTransition
    : DigitRollTransition;

  return (
    <DigitTransition
      key={`${from}->${to}`}
      from={from}
      to={to}
      {...transitioningDigitProps}
    />
  );
};
