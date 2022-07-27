import { Flex, Pressable, Text } from 'native-base'
import { flavors } from 'src/data'
import { PizzaSizeInfo } from 'src/domain/size'
import { toCurrency } from 'src/utils/number'
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
    <Pressable flex={1} onPress={props.onPress}>
      <Flex direction="column" align="center">
        <PizzaCircle centimeters={centimeters} slices={slices} />
        <Text fontSize="md" bold>
          {name}
        </Text>
        <Text>{slices} slices</Text>
        <Text>{centimeters}cm</Text>
        <Text>
          {maxFlavors} {maxFlavors < 2 ? 'flavor' : 'flavors'}
        </Text>
        <Text>
          from <Text fontWeight="medium">{toCurrency(price)}</Text>
        </Text>
      </Flex>
    </Pressable>
  )
}
