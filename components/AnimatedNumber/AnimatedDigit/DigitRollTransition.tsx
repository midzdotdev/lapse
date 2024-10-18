import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  clamp,
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TICKER_ANIMATION_DURATION } from "../../../constants";
import { DigitTransitionProps, styles } from "./transition-common";

export const DigitRollTransition = ({
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

  const viewAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: -transitionProgress.value * height,
      },
    ],
  }));

  const fromTextAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - Easing.ease(clamp(transitionProgress.value, 0, 1)),
  }));

  const toTextAnimatedStyle = useAnimatedStyle(() => ({
    opacity: Easing.ease(clamp(transitionProgress.value, 0, 1)),
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          styles.digitWrapper,
          viewAnimatedStyle,
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
        <Animated.Text
          style={[
            styles.toText,
            toTextAnimatedStyle,
            {
              transform: [{ translateY: height }],
            },
            textStyle,
          ]}
        >
          {to ?? " "}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};
