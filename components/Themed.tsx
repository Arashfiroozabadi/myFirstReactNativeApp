import * as React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  Button as DefaultButton,
} from "react-native";

import {
  Button as TestButton,
  Icon as DefaultIcon,
  Input as DefaultInput,
} from "native-base";

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
export type IconProps = ThemeProps & DefaultIcon["props"];
export type InputProps = ThemeProps & DefaultInput["props"];

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
      return <TestButton style={{ padding: 10 }} dark {...props} />;
    default:
      return <TestButton style={{ padding: 10 }} light {...props} />;
  }
}

export function IconBase(props: IconProps): JSX.Element {
  const colorScheme = useColorScheme();
  return (
    <DefaultIcon
      style={{
        color: Colors[colorScheme].icons,
      }}
      {...props}
    />
  );
}

export function InputBase(props: InputProps): JSX.Element {
  const colorScheme = useColorScheme();
  return (
    <DefaultInput
      style={{
        color: Colors[colorScheme].text,
      }}
      placeholderTextColor={Colors[colorScheme].placeholder}
      {...props}
    />
  );
}
