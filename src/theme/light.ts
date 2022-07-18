import { themeColorsBase } from './base'
import { Theme } from './types'

export const lightTheme: Theme = {
  color: {
    ...themeColorsBase,

    background: '#efefef',
    background_card: '#ffffff',

    text_primary: '#0f0f0f',
    text_secondary: '#7f7f7f',
    text_contrast: '#efefef',

    info: '#1d90f5',
    warning: '#dfaf1f',
    error: '#df0f0f',
    success: '#1fdf1f',

    primary_050: '#fff59f',
    primary_100: '#fbeb7f',
    primary_200: '#f8e55f',
    primary_300: '#f5db3f',
    primary_400: '#f2d51f',
    primary_500: '#efcf00',
    primary_600: '#cfaf00',
    primary_700: '#af8f00',
    primary_800: '#8f6f00',
    primary_900: '#6f4f00',
  },
}
