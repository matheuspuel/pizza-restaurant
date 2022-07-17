import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet'
import { useState } from 'react'
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { flavors as allFlavors, sizes } from 'src/data'
import { Flavor } from 'src/domain/flavor'
import { PizzaSizeInfo } from 'src/domain/size'
import { getOrder } from 'src/redux/slices/order'
import { useAppSelector } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { toCurrency } from 'src/utils/number'

const Summary_ = (props: RootStackScreenProps<'Summary'>) => {
  const { navigation } = props
  const { showActionSheetWithOptions } = useActionSheet()
  const order = useAppSelector(getOrder)
  const [observation, setObservation] = useState('')

  const pizzas = order.pizzas.map(p => {
    const size = sizes[p.sizeId]
    const flavors = p.flavorIds
      .map(id => allFlavors[id])
      .filter((f): f is Flavor => f !== undefined)
    const price =
      flavors.reduce((acc, f) => acc + f.prices[p.sizeId], 0) / flavors.length
    return { size, flavors, price }
  })

  const totalPrice = pizzas.reduce((acc, p) => acc + p.price, 0)

  const showItemOptions = (index: number) =>
    showActionSheetWithOptions(
      {
        options: ['Change Size', 'Change Flavors', 'Remove Item', 'Cancel'],
        title: 'Actions',
        destructiveButtonIndex: 3,
      },
      i => {
        if (i === 0) {
          navigation.navigate('Sizes', { itemIndex: index })
        } else if (i === 1) {
        } else if (i === 2) {
        } else {
        }
      }
    )

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pizzas}
        renderItem={({ item, index }) => (
          <OrderItem data={item} onPress={() => showItemOptions(index)} />
        )}
      />
      <View style={{ padding: 4 }}>
        <Text style={{ alignSelf: 'flex-end', padding: 4 }}>
          Total:{' '}
          <Text style={{ fontWeight: '700' }}>{toCurrency(totalPrice)}</Text>
        </Text>
        <View style={{ padding: 4 }}>
          <TextInput
            value={observation}
            onChangeText={setObservation}
            placeholder="Observations"
            multiline
            numberOfLines={3}
            returnKeyType="none"
            textAlignVertical="top"
            style={{ padding: 4, borderRadius: 4, backgroundColor: '#dfdfdf' }}
          />
        </View>
        <View style={{ padding: 4 }}>
          <Button
            title="Add Item"
            onPress={() => navigation.navigate('Categories')}
          />
        </View>
        <View style={{ padding: 4 }}>
          <Button title="Finish Order" />
        </View>
      </View>
    </View>
  )
}
export const Summary = connectActionSheet(Summary_)

const OrderItem = (props: {
  data: {
    size: PizzaSizeInfo
    flavors: Flavor[]
    price: number
  }
  onPress: () => void
}) => {
  const { size, flavors, price } = props.data

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ flexDirection: 'row', padding: 4 }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 4,
        }}
      >
        <Text>Pizza</Text>
        <Text> ({size.name})</Text>
        {flavors.map((f, i) => (
          <Text key={i} style={{ paddingLeft: 4 }}>
            • {f.name}
          </Text>
        ))}
      </View>
      <Text style={{ padding: 4, fontWeight: '700' }}>{toCurrency(price)}</Text>
    </TouchableOpacity>
  )
}
