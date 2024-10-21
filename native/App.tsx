import { StatusBar } from "react-native";
import { useResetTimestampOnBlur } from "./atoms/timestamp";
import { ThemeProvider } from "./contexts/theme";
import { MainScreen } from "./screens/MainScreen";
import { useReduceMotionChangedListener } from "./utils/reduce-motion";

export default function App() {
  useResetTimestampOnBlur();
  useReduceMotionChangedListener();

  return (
    <>
      <StatusBar hidden />
      <ThemeProvider>
        <MainScreen />
      </ThemeProvider>
    </>
  );
}
