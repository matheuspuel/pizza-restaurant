import { extendTheme } from 'native-base'

export const lightTheme = extendTheme({
  colors: {
    primary: {
      50: '#FDE7E3',
      100: '#FBCFC6',
      200: '#F9B7AA',
      300: '#F69F8D',
      400: '#F48771',
      500: '#F26F54',
      600: '#F0573A',
      700: '#CE2F10',
      800: '#8A200A',
      900: '#451005',
    },
    lightText: '#FFFFFF',
    darkText: '#1E1E1E',
    grayText: '#606060',
    background: '#F2F2F2',
  },
  fontConfig: {
    Tommy: {
      100: { normal: 'MADE_TOMMY_100Thin' },
      200: { normal: 'MADE_TOMMY_300Light' },
      300: { normal: 'MADE_TOMMY_300Light' },
      400: { normal: 'MADE_TOMMY_400Regular' },
      500: { normal: 'MADE_TOMMY_500Medium' },
      600: { normal: 'MADE_TOMMY_500Medium' },
      700: { normal: 'MADE_TOMMY_700Bold' },
      800: { normal: 'MADE_TOMMY_800ExtraBold' },
      900: { normal: 'MADE_TOMMY_900Black' },
    },
  },
  fonts: {
    heading: 'Tommy' as any,
    body: 'Tommy' as any,
    mono: 'Tommy' as any,
  },
  components: {
    Text: { baseStyle: { _light: { color: 'darkText' } } },
    Heading: { baseStyle: { _light: { color: 'darkText' } } },
  },
})

type CustomTheme = typeof lightTheme

declare module 'native-base' {
  interface ICustomTheme extends CustomTheme {}
}
