import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Flex, Icon, Text } from 'native-base'
import { toCurrency } from 'src/utils/number'

export const Price = (props: { price: number; oldPrice?: number }) => {
  const { price, oldPrice } = props

  return (
    <Flex flex={1} direction="row" justify="flex-end" align="center">
      {oldPrice === undefined ? null : (
        <>
          <Icon
            as={<MaterialCommunityIcons name="sale" />}
            color="red.700"
            size="md"
            mr="2"
          />
          <Text mr="2" textDecorationLine="line-through">
            {toCurrency(oldPrice)}
          </Text>
        </>
      )}
      <Text bold>{toCurrency(price)}</Text>
    </Flex>
  )
}
