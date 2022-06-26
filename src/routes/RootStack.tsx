import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { Home } from 'src/views/Home'
import { Flavors } from 'src/views/Flavors'
import { PizzaSizeId } from 'src/domain/size'
import { Sizes } from 'src/views/Sizes'

export type RootStackScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList
> = StackScreenProps<RootStackParamList, S>

export type RootStackParamList = {
  Home: undefined
  Sizes: undefined
  Flavors: { sizeId: PizzaSizeId }
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
    <Stack.Screen name="Sizes" component={Sizes} />
    <Stack.Screen name="Flavors" component={Flavors} />
  </Stack.Navigator>
)
