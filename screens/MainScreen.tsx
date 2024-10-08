import { AppState, StyleSheet, View } from "react-native";
import { DurationTicker } from "../components/DurationTicker";
import { useEffect } from "react";
import { useDurationObject } from "../hooks/useDurationObject";
import { useLastUsedStorage } from "../hooks/useLastUsedStorage";
import { createStyles } from "../theme";

export const MainScreen = () => {
  const [lastUsed, reset] = useLastUsedStorage();
  const interval = useDurationObject(lastUsed);
  const styles = useStyles();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "background") return;

      reset();
    });

    return () => {
      subscription.remove();
    };
  }, [reset]);

  if (interval === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DurationTicker duration={interval} />
    </View>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
}));
