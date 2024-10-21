import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import {
  ColorSchemeName,
  ImageStyle,
  StyleSheet,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";

interface Theme {
  colors: {
    background: string;
    text: string;
  };
}

const lightTheme: Theme = {
  colors: {
    background: "#FFFFFF",
    text: "#000000",
  },
};

const darkTheme: Theme = {
  colors: {
    background: "#121212",
    text: "#F5F5F5",
  },
};

const getThemeFromColorScheme = (colorScheme: ColorSchemeName): Theme => {
  if (!colorScheme) {
    return lightTheme;
  }

  return {
    light: lightTheme,
    dark: darkTheme,
  }[colorScheme];
};

const ThemeContext = createContext<Theme>(getThemeFromColorScheme("light"));

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();

  const theme = useMemo(
    () => getThemeFromColorScheme(colorScheme),
    [colorScheme]
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const themedStylesHook =
  <T extends { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }>(
    makeStyles: (theme: Theme) => T
  ): (() => T) =>
  () => {
    const theme = useTheme();

    return useMemo(() => StyleSheet.create(makeStyles(theme)), [theme]);
  };
