import { ThemeProvider } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <ThemeProvider>
        <MainScreen />
      </ThemeProvider>
    </>
  );
}
