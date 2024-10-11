import React, { ComponentProps, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import Animated, {
  clamp,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TICKER_ANIMATION_DURATION } from "../constants";

export const RollingDigit = ({
  digit,
  ...transitioningDigitProps
}: {
  digit: number | null;
} & Omit<ComponentProps<typeof TransitioningDigit>, "to" | "from">) => {
  const [{ from, to }, setActive] = useState<
    Pick<ComponentProps<typeof TransitioningDigit>, "to" | "from">
  >({
    from: null,
    to: digit,
  });

  useEffect(() => {
    if (to === digit) return;

    setActive({ from: to, to: digit });
  }, [digit]);

  return (
    <TransitioningDigit
      key={`${from}->${to}`}
      from={from}
      to={to}
      {...transitioningDigitProps}
    />
  );
};

export const TransitioningDigit = ({
  from,
  to,
  height,
  textStyle,
  containerStyle,
}: {
  from: number | null;
  to: number | null;
  height: number;
  containerStyle?: React.ComponentProps<typeof View>["style"];
  textStyle?: React.ComponentProps<typeof Text>["style"];
}) => {
  const transitionProgress = useSharedValue(0);

  useEffect(() => {
    transitionProgress.value = withTiming(1, {
      duration: TICKER_ANIMATION_DURATION,
      easing: Easing.elastic(1),
    });
  }, []);

  const viewShiftStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: -transitionProgress.value * height,
      },
    ],
  }));

  const fromTextFadeOutStyle = useAnimatedStyle(() => ({
    opacity: 1 - Easing.ease(clamp(transitionProgress.value, 0, 1)),
  }));

  const toTextFadeInStyle = useAnimatedStyle(() => ({
    opacity: Easing.ease(clamp(transitionProgress.value, 0, 1)),
  }));

  return (
    <View
      style={[
        { alignItems: "center", justifyContent: "center" },
        containerStyle,
        { overflow: "hidden" },
      ]}
    >
      <Animated.View
        style={[
          styles.digitContainer,
          viewShiftStyle,
          {
            width: height * 0.6,
          },
        ]}
      >
        {from !== null ? (
          <Animated.Text
            style={[
              textStyle,
              {
                position: "absolute",
              },
              fromTextFadeOutStyle,
            ]}
          >
            {from}
          </Animated.Text>
        ) : null}
        <Animated.Text
          style={[
            textStyle,
            {
              position: "relative",
              transform: [
                {
                  translateY: height,
                },
              ],
            },
            toTextFadeInStyle,
          ]}
        >
          {to ?? " "}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  digitContainer: {
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
  },
});
