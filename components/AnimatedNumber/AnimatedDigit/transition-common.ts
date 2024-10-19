import { StyleSheet, Text, View } from "react-native";

export interface DigitTransitionProps {
  from: number | null;
  to: number | null;
  height: number;
  containerStyle?: React.ComponentProps<typeof View>["style"];
  textStyle?: React.ComponentProps<typeof Text>["style"];
}

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  digitWrapper: {
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
  },
  fromText: {
    position: "absolute",
  },
  toText: {
    position: "relative",
  },
});
