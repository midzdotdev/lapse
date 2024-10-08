import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  AnimationCallback,
  Easing,
  FadeIn,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DIGIT_ARRAY = Array.from({ length: 10 }).fill(null);

export const RollingDigit = ({
  digit,
  height,
  textStyle,
  containerStyle,
}: {
  digit: number;
  height: number;
  animationCallback?: AnimationCallback;
  textStyle?: React.ComponentProps<typeof Text>["style"];
  containerStyle?: React.ComponentProps<typeof Animated.View>["style"];
}) => {
  const animatedValue = useSharedValue(digit);
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: (animatedValue.value || 0) * height }],
    }),
    [height]
  );

  useEffect(() => {
    animatedValue.value = withTiming(-digit, {
      duration: 600,
      easing: Easing.elastic(1),
    });
  }, [digit]);

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn}
      style={[
        { alignItems: "center", justifyContent: "center" },
        containerStyle,
        { overflow: "hidden" },
      ]}
    >
      <Animated.View style={[styles.digitContainer, animatedStyle]}>
        {DIGIT_ARRAY.map((_, index) => (
          <Text
            key={index}
            style={[
              textStyle,
              {
                position: index === 0 ? "relative" : "absolute",
                transform: [{ translateY: (height || 0) * index }],
              },
            ]}
          >
            {index}
          </Text>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  digitContainer: {
    alignItems: "center",
    overflow: "visible",
    justifyContent: "center",
  },
});
