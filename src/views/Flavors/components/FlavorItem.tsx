import { View } from 'react-native'
import { Flavor } from 'src/domain/flavor'
import { PizzaSizeId } from 'src/domain/size'
import { rangeArray } from 'src/utils/array'
import {
  CheckedIcon,
  ItemButton,
  ItemDescription,
  ItemTitle,
  RecommendedIcon,
  SpiceIcon,
  VegetarianIcon,
} from '../styles'
import { Price } from './Price'

export const FlavorItem = (props: {
  data: Flavor
  sizeId: PizzaSizeId
  selected?: boolean
  onPress: () => void
}) => {
  const { name, description, prices, tags, spiceLevel, oldPrices } = props.data
  const price = prices[props.sizeId]
  const oldPrice = oldPrices?.[props.sizeId]

  return (
    <ItemButton sweet={tags?.sweet} onPress={props.onPress}>
      <View style={{ flexDirection: 'row' }}>
        <ItemTitle>{name}</ItemTitle>
        {tags?.recommended && <RecommendedIcon />}
        {tags?.vegetarian && <VegetarianIcon />}
        <View style={{ marginRight: 6 }}></View>
        {rangeArray(spiceLevel).map(i => (
          <SpiceIcon key={i} />
        ))}
        <Price price={price} oldPrice={oldPrice} />
      </View>
      <View style={{ flexDirection: 'row', minHeight: 25 }}>
        <ItemDescription>{description}</ItemDescription>
        {props.selected && <CheckedIcon />}
      </View>
    </ItemButton>
  )
}
