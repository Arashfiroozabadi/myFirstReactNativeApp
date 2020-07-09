import * as React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  Button as DefaultButton,
} from "react-native";

import { Button as TestButton } from "native-base";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { dark?: string; light?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  darkColor?: string;
  lightColor?: string;
  theme?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ButtonProps = ThemeProps & DefaultButton["props"];
export type TestProps = ThemeProps & TestButton["props"];

export function Text(props: TextProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Button(props: ButtonProps): JSX.Element {
  const { ...otherProps } = props;
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultButton {...otherProps} />;
}

export function BaseButton(props: TestProps): JSX.Element {
  const colorScheme = useColorScheme();
  switch (colorScheme) {
    case "dark":
      return <TestButton dark {...props} />;
    default:
      return <TestButton light {...props} />;
  }
}
