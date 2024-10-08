import { useCallback, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { RollingDigit } from "./RollingDigit";

export const RollingNumber = ({
  value,
  containerStyle,
  textStyle,
  digitsWrapperStyle,
  digitContainerStyle,
}: {
  value: number;
  containerStyle?: React.ComponentProps<typeof Animated.View>["style"];
  textStyle?: React.ComponentProps<typeof RollingDigit>["textStyle"];
  digitsWrapperStyle?: React.ComponentProps<typeof View>["style"];
  digitContainerStyle?: React.ComponentProps<
    typeof RollingDigit
  >["containerStyle"];
}) => {
  const [height, setHeight] = useState<number>(0);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (height !== e.nativeEvent.layout.height) {
        setHeight(e.nativeEvent.layout.height);
      }
    },
    [height]
  );

  return (
    <Animated.View
      layout={LinearTransition}
      style={[styles.container, containerStyle]}
    >
      <View
        style={[styles.digitsWrapper, digitsWrapperStyle]}
        onLayout={handleLayout}
      >
        {`${value}`.split("").map((digit, index) => (
          <RollingDigit
            key={index}
            digit={Number(digit)}
            height={height}
            containerStyle={digitContainerStyle}
            textStyle={textStyle}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  digitsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
