import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const WithFade = ({
  show,
  children,
}: {
  show: boolean;
  children: (animatedStyle: any) => React.ReactNode;
}) => {
  const animationProgress = useSharedValue(0);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: animationProgress.value,
  }));

  useEffect(() => {
    animationProgress.value = withTiming(show ? 1 : 0, {
      duration: 300,
    });
  }, [show]);

  return children(fadeStyle);
};
