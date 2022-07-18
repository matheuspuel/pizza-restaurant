import { TouchableOpacity, View } from 'react-native'
import { Flavor } from 'src/domain/flavor'
import { PizzaSizeInfo } from 'src/domain/size'
import { decrementPizza, incrementPizza } from 'src/redux/slices/order'
import { useAppDispatch } from 'src/redux/store'
import { toCurrency } from 'src/utils/number'
import {
  FlavorText,
  ItemNameText,
  ItemQuantityText,
  MinusIcon,
  OrderItemPriceText,
  PlusIcon,
} from '../styles'

export const OrderItem = (props: {
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
        style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 4 }}
      >
        <ItemNameText>Pizza ({size.name})</ItemNameText>
        {flavors.map((f, i) => (
          <FlavorText key={i}>• {f.name}</FlavorText>
        ))}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <View style={{ flexDirection: 'row', padding: 4 }}>
          <TouchableOpacity
            onPress={() => dispatch(decrementPizza({ itemIndex: props.index }))}
          >
            <MinusIcon />
          </TouchableOpacity>
          <ItemQuantityText>{quantity}</ItemQuantityText>
          <TouchableOpacity
            onPress={() => dispatch(incrementPizza({ itemIndex: props.index }))}
          >
            <PlusIcon />
          </TouchableOpacity>
        </View>
        <OrderItemPriceText>{toCurrency(price)}</OrderItemPriceText>
      </View>
    </TouchableOpacity>
  )
}
