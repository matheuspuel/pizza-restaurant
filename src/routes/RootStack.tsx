import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { PizzaSizeId } from 'src/domain/size'
import { t } from 'src/i18n'
import { Address } from 'src/views/Address'
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
  Sizes?: { itemIndex: number }
  Flavors: { sizeId: PizzaSizeId; itemIndex?: number }
  Summary: undefined
  Address: undefined
  Finished: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export const RootStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      // headerTintColor: theme.colors.lightText,
      headerTitleStyle: { fontFamily: 'MADE_TOMMY_500Medium' },
    }}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Sizes"
      component={Sizes}
      options={{ title: t('sizes') }}
    />
    <Stack.Screen
      name="Flavors"
      component={Flavors}
      options={{ title: t('Flavors') }}
    />
    <Stack.Screen
      name="Summary"
      component={Summary}
      options={{ title: t('summary') }}
    />
    <Stack.Screen
      name="Address"
      component={Address}
      options={{ title: t('address') }}
    />
    <Stack.Screen
      name="Finished"
      component={Finished}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)
