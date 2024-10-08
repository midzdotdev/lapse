import { DurationObject } from "../hooks/useDurationObject";
import { StyleSheet, Text, View } from "react-native";
import { RollingNumber } from "./RollingNumber";
import { createStyles, useTheme } from "../theme";

export const DurationTicker = ({ duration }: { duration: DurationObject }) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.valuesColumn}>
        {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
          <RollingNumber
            key={unit}
            value={duration[unit]}
            containerStyle={{
              alignItems: "flex-end",
            }}
            digitContainerStyle={{
              borderRadius: 8,
            }}
            textStyle={{
              fontSize: 64,
              fontWeight: "900",
              color: theme.colors.text,
            }}
          />
        ))}
      </View>
      <View style={styles.unitsColumn}>
        {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
          <Text key={unit} style={styles.unitText}>
            {unit}
          </Text>
        ))}
      </View>
    </View>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  valuesColumn: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  unitsColumn: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    flexDirection: "column",
    gap: 16,
  },
  unitText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
  },
}));
