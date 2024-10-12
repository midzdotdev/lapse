import { AppState, View } from "react-native";
import { DurationTicker } from "../components/DurationTicker";
import { useEffect } from "react";
import { useDurationObject } from "../hooks/useDurationObject";
import { themedStylesHook } from "../contexts/theme";
import { useTimestamp } from "../atoms/timestamp";

export const MainScreen = () => {
  const styles = useStyles();

  const timestamp = useTimestamp() ?? null;
  const durationObject = useDurationObject(timestamp);

  if (durationObject === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DurationTicker duration={durationObject} />
    </View>
  );
};

const useStyles = themedStylesHook((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
}));
