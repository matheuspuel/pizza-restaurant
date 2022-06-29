import { View } from 'react-native'
import { flavors, sizes } from 'src/data'
import {
  Container,
  ItemButton,
  ItemCentimeters,
  ItemPrice,
  ItemPriceValue,
  ItemSlices,
  ItemTitle,
  Title,
} from './styles'
import { toCurrency } from 'src/utils/number'
import { PizzaSizeInfo } from 'src/domain/size'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { PizzaCircle } from './components/PizzaCircle'

export const Sizes = (props: RootStackScreenProps<'Sizes'>) => {
  const { navigation } = props
  const sizesArray = Object.values(sizes)
  const sizesRow1 = sizesArray.slice(0, 3)
  const sizesRow2 = sizesArray.slice(3, 5)

  return (
    <Container>
      <Title>Choose the Size</Title>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {sizesRow1.map(s => (
          <SizeItem
            key={s.id}
            data={s}
            onPress={() => navigation.navigate('Flavors', { sizeId: s.id })}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {sizesRow2.map(s => (
          <SizeItem
            key={s.id}
            data={s}
            onPress={() => navigation.navigate('Flavors', { sizeId: s.id })}
          />
        ))}
      </View>
    </Container>
  )
}

const SizeItem = (props: { data: PizzaSizeInfo; onPress: () => void }) => {
  const { id, name, slices, centimeters, maxFlavors } = props.data
  const price = flavors.reduce(
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
