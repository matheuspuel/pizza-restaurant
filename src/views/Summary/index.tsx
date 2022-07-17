import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import {
  Alert,
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
import { getAuthentication } from 'src/redux/slices/authentication'
import {
  decrementPizza,
  getOrder,
  incrementPizza,
  removePizza,
} from 'src/redux/slices/order'
import { useAppDispatch, useAppSelector } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { toCurrency } from 'src/utils/number'

const Summary_ = (props: RootStackScreenProps<'Summary'>) => {
  const { navigation } = props
  const dispatch = useAppDispatch()
  const order = useAppSelector(getOrder)
  const authentication = useAppSelector(getAuthentication)
  const [observation, setObservation] = useState('')
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
      navigation.navigate('Finished')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
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

const OrderItem = (props: {
  data: {
    size: PizzaSizeInfo
    flavors: Flavor[]
    quantity: number
    price: number
  }
  index: number
  onPress: () => void
}) => {
  const { size, flavors, quantity, price } = props.data
  const dispatch = useAppDispatch()

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
      <View style={{ alignItems: 'flex-end' }}>
        <View style={{ flexDirection: 'row', padding: 4 }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(decrementPizza({ itemIndex: props.index }))
            }}
          >
            <MaterialCommunityIcons
              name="minus"
              style={{ color: '#bf0000', fontSize: 24 }}
            />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', width: 20, marginHorizontal: 4 }}>
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(incrementPizza({ itemIndex: props.index }))
            }}
          >
            <MaterialCommunityIcons
              name="plus"
              style={{ color: '#00bf00', fontSize: 24 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ padding: 4, fontWeight: '700' }}>
          {toCurrency(price)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
