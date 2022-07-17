import { Alert, View } from 'react-native'
import { flavors, sizes } from 'src/data'
import { PizzaSizeInfo } from 'src/domain/size'
import { maybeChangePizzaSize } from 'src/redux/slices/order'
import { useAppDispatch } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { toCurrency } from 'src/utils/number'
import { PizzaCircle } from './components/PizzaCircle'
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

const sizesArray = Object.values(sizes)
const sizesRow1 = sizesArray.slice(0, 3)
const sizesRow2 = sizesArray.slice(3, 5)

export const Sizes = (props: RootStackScreenProps<'Sizes'>) => {
  const { navigation } = props
  const { itemIndex } = props.route.params ?? {}

  const dispatch = useAppDispatch()

  const onPress = (info: PizzaSizeInfo) => {
    if (itemIndex === undefined) {
      navigation.navigate('Flavors', { sizeId: info.id })
    } else {
      const res = dispatch(maybeChangePizzaSize({ itemIndex, sizeId: info.id }))
      if (res.valid) {
        navigation.navigate('Summary')
      } else {
        Alert.alert('Error', res.error)
      }
    }
  }

  return (
    <Container>
      <Title>Choose the Size</Title>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {sizesRow1.map(s => (
          <SizeItem key={s.id} data={s} onPress={() => onPress(s)} />
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {sizesRow2.map(s => (
          <SizeItem key={s.id} data={s} onPress={() => onPress(s)} />
        ))}
      </View>
    </Container>
  )
}

const SizeItem = (props: { data: PizzaSizeInfo; onPress: () => void }) => {
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
