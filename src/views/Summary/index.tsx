import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet'
import { Alert, Button, FlatList, TextInput, View } from 'react-native'
import { flavors as allFlavors, sizes } from 'src/data'
import { Flavor } from 'src/domain/flavor'
import { getAuthentication } from 'src/redux/slices/authentication'
import { getOrder, removePizza, setObservation } from 'src/redux/slices/order'
import { useAppDispatch, useAppSelector } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { toCurrency } from 'src/utils/number'
import { OrderItem } from './components/OrderItem'
import { TotalPriceText, TotalText } from './styles'

const Summary_ = (props: RootStackScreenProps<'Summary'>) => {
  const { navigation } = props
  const dispatch = useAppDispatch()
  const order = useAppSelector(getOrder)
  const authentication = useAppSelector(getAuthentication)
  const { showActionSheetWithOptions } = useActionSheet()

  const pizzas = order.pizzas.map(p => {
    const size = sizes[p.sizeId]
    const flavors = p.flavorIds
      .map(id => allFlavors[id])
      .filter((f): f is Flavor => f !== undefined)
    const quantity = p.quantity
    const price =
      (quantity * flavors.reduce((acc, f) => acc + f.prices[p.sizeId], 0)) /
      flavors.length
    return { size, flavors, quantity, price }
  })

  const totalPrice = pizzas.reduce((acc, p) => acc + p.price, 0)

  const showItemOptions = (args: {
    item: typeof pizzas[number]
    index: number
  }) =>
    showActionSheetWithOptions(
      {
        options: ['Change Size', 'Change Flavors', 'Remove Item', 'Cancel'],
        title: 'Actions',
        destructiveButtonIndex: 3,
      },
      i => {
        if (i === 0) {
          navigation.navigate('Sizes', { itemIndex: args.index })
        } else if (i === 1) {
          navigation.navigate('Flavors', {
            itemIndex: args.index,
            sizeId: args.item.size.id,
          })
        } else if (i === 2) {
          dispatch(removePizza({ itemIndex: args.index }))
        }
      }
    )

  const onNext = () => {
    if (pizzas.length <= 0) {
      Alert.alert('Error', 'Add at least one item')
    } else if (!authentication.authenticated) {
      navigation.navigate('Address')
    } else {
      navigation.replace('Finished')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={pizzas}
        renderItem={({ item, index }) => (
          <OrderItem
            data={item}
            index={index}
            onPress={() => showItemOptions({ item, index })}
          />
        )}
      />
      <View style={{ padding: 4 }}>
        <TotalText>
          Total:{' '}
          <TotalPriceText style={{ fontFamily: 'MADE_TOMMY_700Bold' }}>
            {toCurrency(totalPrice)}
          </TotalPriceText>
        </TotalText>
        <View style={{ padding: 4 }}>
          <TextInput
            value={order.observation}
            onChangeText={t => dispatch(setObservation(t))}
            placeholder="Observations"
            multiline
            numberOfLines={3}
            returnKeyType="none"
            textAlignVertical="top"
            style={{
              height: 66,
              padding: 4,
              borderRadius: 4,
              backgroundColor: '#dfdfdf',
            }}
          />
        </View>
        <View style={{ padding: 4 }}>
          <Button
            title="Add Item"
            onPress={() => navigation.navigate('Categories')}
          />
        </View>
        <View style={{ padding: 4 }}>
          <Button
            title={authentication.authenticated ? 'Confirm Order' : 'Next'}
            onPress={onNext}
          />
        </View>
      </View>
    </View>
  )
}
export const Summary = connectActionSheet(Summary_)
