import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import { useSavedLocale } from './i18n'
import Router from './routes'

SplashScreen.preventAutoHideAsync()

export const Loading = () => {
  const [fontsLoaded] = useFonts({
    MADE_TOMMY_100Thin: require('src/assets/fonts/MADE_TOMMY_100Thin.otf'),
    MADE_TOMMY_300Light: require('src/assets/fonts/MADE_TOMMY_300Light.otf'),
    MADE_TOMMY_400Regular: require('src/assets/fonts/MADE_TOMMY_400Regular.otf'),
    MADE_TOMMY_500Medium: require('src/assets/fonts/MADE_TOMMY_500Medium.otf'),
    MADE_TOMMY_700Bold: require('src/assets/fonts/MADE_TOMMY_700Bold.otf'),
    MADE_TOMMY_800ExtraBold: require('src/assets/fonts/MADE_TOMMY_800ExtraBold.otf'),
    MADE_TOMMY_900Black: require('src/assets/fonts/MADE_TOMMY_900Black.otf'),
  })
  const [localeLoaded] = useSavedLocale()

  if (!fontsLoaded || !localeLoaded) {
    return null
  }

  return <Router />
}
