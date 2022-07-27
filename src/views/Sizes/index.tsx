import { Flex, Text } from 'native-base'
import { Alert } from 'react-native'
import { sizes } from 'src/data'
import { PizzaSizeInfo } from 'src/domain/size'
import { maybeChangePizzaSize } from 'src/redux/slices/order'
import { useAppDispatch } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { SizeItem } from './components/SizeItem'

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
    <Flex flex={1} p="2" bg="background" justify="space-evenly">
      <Text textAlign="center" fontSize="lg" bold>
        Choose the Size
      </Text>
      <Flex direction="row" align="flex-end">
        {sizesRow1.map(s => (
          <SizeItem key={s.id} data={s} onPress={() => onPress(s)} />
        ))}
      </Flex>
      <Flex direction="row" align="flex-end">
        {sizesRow2.map(s => (
          <SizeItem key={s.id} data={s} onPress={() => onPress(s)} />
        ))}
      </Flex>
    </Flex>
  )
}
