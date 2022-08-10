import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useColorModeValue, useTheme } from 'native-base'
import React from 'react'
import { RootStackNavigator } from './RootStack'

const Navigator = () => {
  const theme = useTheme()

  let navigationTheme = DefaultTheme
  navigationTheme.colors.card = useColorModeValue('#ffffff', '#000000')
  navigationTheme.colors.text = useColorModeValue(
    theme.colors.darkText,
    theme.colors.lightText
  )
  navigationTheme.colors.background = useColorModeValue(
    theme.colors.lightBackground,
    theme.colors.darkBackground
  )
  // navigationTheme.colors.primary = theme.colors.primary[900]

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStackNavigator />
    </NavigationContainer>
  )
}
export default Navigator
