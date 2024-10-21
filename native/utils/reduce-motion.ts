import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { AccessibilityInfo } from "react-native";
import { useReducedMotion } from "react-native-reanimated";

const reduceMotionAtom = atom<boolean | null>(null);

export const useLiveReduceMotion = () => {
  const initialReduceMotion = useReducedMotion();
  const liveReduceMotion = useAtomValue(reduceMotionAtom);

  return liveReduceMotion ?? initialReduceMotion;
};

export const useReduceMotionChangedListener = () => {
  const setReduceMotion = useSetAtom(reduceMotionAtom);

  useEffect(() => {
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (value) => {
        setReduceMotion(value);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);
};
