import { DurationObject, Unit, unitsDesc } from "../hooks/useDurationObject";
import { View } from "react-native";
import { RollingNumber } from "./RollingNumber";
import { themedStylesHook } from "../theme";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useMemo } from "react";
import { WithFade } from "../hoc/WithFade";

export const DurationTicker = ({ duration }: { duration: DurationObject }) => {
  const styles = useStyles();

  const activeUnits = useMemo<Unit[]>(() => {
    const firstActiveIndex = unitsDesc.findIndex((unit) => duration[unit] > 0);
    if (firstActiveIndex === -1) {
      return [];
    }

    return unitsDesc.slice(firstActiveIndex);
  }, [duration]);

  return (
    <Animated.View layout={LinearTransition} style={styles.container}>
      <View style={styles.valuesColumn}>
        {unitsDesc.map((unit) => (
          <RollingNumber
            key={unit}
            value={activeUnits.includes(unit) ? duration[unit] : null}
            length={3}
            containerStyle={styles.rollingNumberContainer}
            textStyle={styles.rollingNumberText}
          />
        ))}
      </View>
      <View style={styles.unitsColumn}>
        {unitsDesc.map((unit) => (
          <WithFade key={unit} show={activeUnits.includes(unit)}>
            {(style) => (
              <Animated.Text style={[styles.unitText, style]}>
                {unit}
              </Animated.Text>
            )}
          </WithFade>
        ))}
      </View>
    </Animated.View>
  );
};

const useStyles = themedStylesHook((theme) => ({
  container: {
    flexDirection: "row",
    gap: 20,
    marginBottom: "50%",
  },
  valuesColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    gap: 10,
  },
  rollingNumberContainer: {
    alignItems: "flex-end",
  },
  rollingNumberText: {
    fontSize: 72,
    fontWeight: 900,
    color: theme.colors.text,
  },
  unitsColumn: {
    flex: 0.618,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    flexDirection: "column",
    gap: 26,
  },
  unitText: {
    marginTop: 24,
    fontSize: 27.5,
    fontWeight: "bold",
    color: theme.colors.text,
  },
}));
