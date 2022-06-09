import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { Home } from 'src/views/Home'
import { Flavors } from 'src/views/Flavors'

export type RootStackScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList
> = StackScreenProps<RootStackParamList, S>

export type RootStackParamList = {
  Home: undefined
  Flavors: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export const RootStackNavigator = () => (
  <Stack.Navigator
  // screenOptions={{
  //   headerTintColor: theme.colors.lightText,
  // }}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Flavors" component={Flavors} />
  </Stack.Navigator>
)
