import { ComponentProps, useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { RollingDigit } from "./RollingDigit";

// Inspired by: https://github.com/BouarourMohammed/react-native-animated-rolling-numbers
// The main difference is that my solution doesn't require rendering out all possible digits
// As a result, we can transition a digit from 9 to 0 without cycling back through all intermediate digits
// And we're left with a seamless continuous infinite roll

export const RollingNumber = ({
  value,
  length,
  containerStyle,
  textStyle,
  digitsWrapperStyle,
  digitContainerStyle,
}: {
  value: number | null;
  length: number;
  containerStyle?: React.ComponentProps<typeof View>["style"];
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

  /*

  Render a fixed number of RollingDigit elements for seamless transitions

  Take the example of incrementing from 9 to 10
  We go from just a units column to a tens column + a units column

  If we vary the number of RollingDigit elements based on the value:
  The tens column becomes the previous units column, and the units column is new
  So the tens column has the transition from 9 to 0, which should be in the units column

  This can't even be fixed by using the key prop, this is the only solution.

  */

  const digits = useMemo<ComponentProps<typeof RollingDigit>["digit"][]>(() => {
    if (value === null) {
      return Array.from({ length }, () => null);
    }

    const valueDigits = `${value}`.split("").map(Number);

    return [
      ...Array.from(
        { length: Math.max(0, length - valueDigits.length) },
        () => null
      ),
      ...valueDigits,
    ];
  }, [value]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[styles.digitsWrapper, digitsWrapperStyle]}
        onLayout={handleLayout}
      >
        {digits.map((digit, index) => (
          <RollingDigit
            key={index}
            digit={digit}
            height={height}
            containerStyle={digitContainerStyle}
            textStyle={textStyle}
          />
        ))}
      </View>
    </View>
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
