import { AppState, View } from "react-native";
import { DurationTicker } from "../components/DurationTicker";
import { useEffect } from "react";
import { useDurationObject } from "../hooks/useDurationObject";
import { useLastUsedStorage } from "../hooks/useLastUsedStorage";
import { themedStylesHook } from "../theme";

export const MainScreen = () => {
  const styles = useStyles();

  const [lastUsed, reset] = useLastUsedStorage();
  const durationObject = useDurationObject(lastUsed);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "background") return;

      reset();
    });

    return () => {
      subscription.remove();
    };
  }, [reset]);

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
