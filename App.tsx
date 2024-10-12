import { useResetTimestampOnBlur } from "./atoms/timestamp";
import { ThemeProvider } from "./contexts/theme";
import { MainScreen } from "./screens/MainScreen";
import { StatusBar } from "react-native";

export default function App() {
  useResetTimestampOnBlur();

  return (
    <>
      <StatusBar hidden />
      <ThemeProvider>
        <MainScreen />
      </ThemeProvider>
    </>
  );
}
