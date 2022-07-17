import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { PizzaSizeId } from 'src/domain/size'
import { Address } from 'src/views/Address'
import { Categories } from 'src/views/Categories'
import { Finished } from 'src/views/Finished'
import { Flavors } from 'src/views/Flavors'
import { Home } from 'src/views/Home'
import { Sizes } from 'src/views/Sizes'
import { Summary } from 'src/views/Summary'

export type RootStackScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList
> = StackScreenProps<RootStackParamList, S>

export type RootStackParamList = {
  Home: undefined
  Categories: undefined
  Sizes?: { itemIndex: number }
  Flavors: { sizeId: PizzaSizeId; itemIndex?: number }
  Summary: undefined
  Address: undefined
  Finished: undefined
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
    <Stack.Screen
      name="Categories"
      component={Categories}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Sizes" component={Sizes} />
    <Stack.Screen name="Flavors" component={Flavors} />
    <Stack.Screen name="Summary" component={Summary} />
    <Stack.Screen name="Address" component={Address} />
    <Stack.Screen name="Finished" component={Finished} />
  </Stack.Navigator>
)
