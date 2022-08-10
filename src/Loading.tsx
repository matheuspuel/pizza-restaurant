import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useMemo, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import splashImage from 'src/../assets/splash.png'
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
  const animation = useMemo(() => new Animated.Value(1), [])
  const [animationComplete, setAnimationComplete] = useState(false)

  const ready = fontsLoaded && localeLoaded

  useEffect(() => {
    if (ready) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true))
    }
  }, [ready])

  if (!ready) {
    return <StatusBar />
  }

  return (
    <>
      <Router />
      {!animationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest?.splash?.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: Constants.manifest?.splash?.resizeMode || 'contain',
              transform: [{ scale: animation }],
              opacity: animation,
            }}
            source={splashImage}
            onLoadEnd={SplashScreen.hideAsync}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </>
  )
}
