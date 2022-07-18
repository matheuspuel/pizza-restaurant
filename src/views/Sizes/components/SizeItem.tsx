import { View } from 'react-native'
import { flavors } from 'src/data'
import { PizzaSizeInfo } from 'src/domain/size'
import { toCurrency } from 'src/utils/number'
import {
  ItemButton,
  ItemCentimeters,
  ItemPrice,
  ItemPriceValue,
  ItemSlices,
  ItemTitle,
} from '../styles'
import { PizzaCircle } from './PizzaCircle'

export const SizeItem = (props: {
  data: PizzaSizeInfo
  onPress: () => void
}) => {
  const { id, name, slices, centimeters, maxFlavors } = props.data
  const price = Object.values(flavors).reduce(
    (min, f) => (min < f.prices[id] ? min : f.prices[id]),
    NaN
  )

  return (
    <ItemButton onPress={props.onPress}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <PizzaCircle centimeters={centimeters} slices={slices} />
        <ItemTitle>{name}</ItemTitle>
        <ItemSlices>{slices} slices</ItemSlices>
        <ItemCentimeters>{centimeters}cm</ItemCentimeters>
        <ItemSlices>
          {maxFlavors} {maxFlavors < 2 ? 'flavor' : 'flavors'}
        </ItemSlices>
        <ItemPrice>
          from <ItemPriceValue>{toCurrency(price)}</ItemPriceValue>
        </ItemPrice>
      </View>
    </ItemButton>
  )
}
