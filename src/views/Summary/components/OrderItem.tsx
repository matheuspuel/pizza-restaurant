import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Flex, Icon, Pressable, Text } from 'native-base'
import { Flavor } from 'src/domain/flavor'
import { PizzaSizeInfo } from 'src/domain/size'
import { decrementPizza, incrementPizza } from 'src/redux/slices/order'
import { useAppDispatch } from 'src/redux/store'
import { toCurrency } from 'src/utils/number'

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
    <Pressable onPress={props.onPress} flexDirection="row" p="1">
      <Flex flex={1} direction="row" flexWrap="wrap" p="1">
        <Text>Pizza ({size.name})</Text>
        {flavors.map((f, i) => (
          <Text key={i} pl="1">
            • {f.name}
          </Text>
        ))}
      </Flex>
      <Flex align="flex-end">
        <Flex direction="row" p="1">
          <Pressable
            onPress={() => dispatch(decrementPizza({ itemIndex: props.index }))}
          >
            <Icon
              as={<MaterialCommunityIcons name="minus" />}
              color="error.500"
              size="lg"
            />
          </Pressable>
          <Text textAlign="center" w="5" mx="1">
            {quantity}
          </Text>
          <Pressable
            onPress={() => dispatch(incrementPizza({ itemIndex: props.index }))}
          >
            <Icon
              as={<MaterialCommunityIcons name="plus" />}
              color="success.500"
              size="lg"
            />
          </Pressable>
        </Flex>
        <Text p="1" bold>
          {toCurrency(price)}
        </Text>
      </Flex>
    </Pressable>
  )
}
