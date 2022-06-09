import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { RootStackNavigator } from './RootStack'

let navigationTheme = DefaultTheme
// navigationTheme.colors.card = theme.colors.primary[500]
// navigationTheme.colors.text = theme.colors.lightText
// navigationTheme.colors.primary = theme.colors.primary[900]
// navigationTheme.colors.background = theme.colors.background

const Navigator = () => (
  <NavigationContainer theme={navigationTheme}>
    <RootStackNavigator />
  </NavigationContainer>
)

export default Navigator
