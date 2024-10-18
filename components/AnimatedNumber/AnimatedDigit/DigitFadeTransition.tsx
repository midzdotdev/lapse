import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TICKER_ANIMATION_DURATION } from "../../../constants";
import { DigitTransitionProps, styles } from "./transition-common";

export const DigitFadeTransition = ({
  from,
  to,
  height,
  textStyle,
  containerStyle,
}: DigitTransitionProps) => {
  const transitionProgress = useSharedValue(0);

  useEffect(() => {
    transitionProgress.value = withTiming(1, {
      duration: TICKER_ANIMATION_DURATION,
      easing: Easing.elastic(1),
      reduceMotion: ReduceMotion.Never,
    });
  }, []);

  const fromTextAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(transitionProgress.value, [0, 0.5], [1, 0]),
  }));

  const toTextAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(transitionProgress.value, [0.5, 1], [0, 1]),
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          styles.digitWrapper,
          {
            width: height * 0.6,
          },
        ]}
      >
        {from !== null ? (
          <Animated.Text
            style={[styles.fromText, fromTextAnimatedStyle, textStyle]}
          >
            {from}
          </Animated.Text>
        ) : null}
        <Animated.Text style={[styles.toText, toTextAnimatedStyle, textStyle]}>
          {to ?? " "}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};
