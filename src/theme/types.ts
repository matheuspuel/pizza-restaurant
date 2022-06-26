export interface Theme {
  color: ThemeColors
}

export type ThemeColors = ThemeColorsBase & {
  background: Color
  background_card: Color

  text_primary: Color
  text_secondary: Color
  text_contrast: Color

  info: Color
  warning: Color
  danger: Color
  success: Color

  primary_050: Color
  primary_100: Color
  primary_200: Color
  primary_300: Color
  primary_400: Color
  primary_500: Color
  primary_600: Color
  primary_700: Color
  primary_800: Color
  primary_900: Color
}

export type ThemeColorsBase = {
  gray_050: Color
  gray_100: Color
  gray_200: Color
  gray_300: Color
  gray_400: Color
  gray_500: Color
  gray_600: Color
  gray_700: Color
  gray_800: Color
  gray_900: Color

  red_050: Color
  red_100: Color
  red_200: Color
  red_300: Color
  red_400: Color
  red_500: Color
  red_600: Color
  red_700: Color
  red_800: Color
  red_900: Color

  yellow_050: Color
  yellow_100: Color
  yellow_200: Color
  yellow_300: Color
  yellow_400: Color
  yellow_500: Color
  yellow_600: Color
  yellow_700: Color
  yellow_800: Color
  yellow_900: Color

  green_050: Color
  green_100: Color
  green_200: Color
  green_300: Color
  green_400: Color
  green_500: Color
  green_600: Color
  green_700: Color
  green_800: Color
  green_900: Color

  blue_050: Color
  blue_100: Color
  blue_200: Color
  blue_300: Color
  blue_400: Color
  blue_500: Color
  blue_600: Color
  blue_700: Color
  blue_800: Color
  blue_900: Color
}

type Color = string
