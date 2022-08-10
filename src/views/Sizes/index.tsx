import { Flex, Text } from 'native-base'
import { Alert } from 'react-native'
import { sizes } from 'src/data'
import { PizzaSizeInfo } from 'src/domain/size'
import { t } from 'src/i18n'
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
    <Flex safeArea flex={1} p="2" bg="background">
      <Flex
        m="2"
        p="2"
        rounded="full"
        bg={{
          linearGradient: {
            colors: ['primary.700', 'yellow.600'],
            start: [0, 1],
            end: [1, 0],
          },
        }}
      >
        <Text textAlign="center" fontSize="lg" bold color="white">
          {t('choose_size')}
        </Text>
      </Flex>
      <Flex flex={1} justify="space-evenly">
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
    </Flex>
  )
}
