import { Alert, View } from 'react-native'
import { sizes } from 'src/data'
import { PizzaSizeInfo } from 'src/domain/size'
import { maybeChangePizzaSize } from 'src/redux/slices/order'
import { useAppDispatch } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { SizeItem } from './components/SizeItem'
import { Container, Title } from './styles'

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
