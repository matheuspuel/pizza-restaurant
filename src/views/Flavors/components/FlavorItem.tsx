import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Flex, Icon, Pressable, Text } from 'native-base'
import { Flavor } from 'src/domain/flavor'
import { PizzaSizeId } from 'src/domain/size'
import { rangeArray } from 'src/utils/array'
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
    <Pressable
      m="1"
      p="2"
      rounded="lg"
      _light={{ bg: 'white' }}
      _dark={{ bg: 'gray.800' }}
      shadow="2"
      onPress={props.onPress}
    >
      <Flex direction="row" align="center">
        <Text fontSize="md" bold mr="2">
          {name}
        </Text>
        {tags?.recommended && (
          <Icon
            as={<MaterialCommunityIcons name="star" />}
            color="yellow.600"
            size="md"
            mr="2"
          />
        )}
        {tags?.vegetarian && (
          <Icon
            as={<MaterialCommunityIcons name="leaf" />}
            color="green.700"
            size="md"
            mr="2"
          />
        )}
        <Flex mr="1.5"></Flex>
        {rangeArray(spiceLevel).map(i => (
          <Icon
            key={i}
            as={<MaterialCommunityIcons name="fire" />}
            color="red.700"
            size="md"
            ml="-3"
          />
        ))}
        <Price price={price} oldPrice={oldPrice} />
      </Flex>
      <Flex direction="row">
        <Text flex={1}>{description}</Text>
        {props.selected && (
          <Icon
            as={<MaterialCommunityIcons name="check-bold" />}
            color="green.700"
            size="md"
          />
        )}
      </Flex>
    </Pressable>
  )
}
