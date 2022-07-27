import { Button, Flex, Image, Text } from 'native-base'
import scooterDeliveryImage from 'src/assets/images/scooter-delivery.png'
import { clearOrder } from 'src/redux/slices/order'
import { useAppDispatch } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'

export const Finished = (props: RootStackScreenProps<'Finished'>) => {
  const { navigation } = props
  const dispatch = useAppDispatch()

  const onNext = () => {
    dispatch(clearOrder())
    navigation.replace('Home')
  }

  return (
    <Flex flex={1}>
      <Flex flex={1} />
      <Text textAlign="center" fontSize="3xl" bold>
        Order Received
      </Text>
      <Flex flex={1} />
      <Image
        alt="Delivery"
        w={250}
        h={250}
        alignSelf="center"
        source={scooterDeliveryImage}
      />
      <Text textAlign="center" fontSize="2xl">
        Estimated delivery time:
      </Text>
      <Text textAlign="center" fontSize="2xl">
        45 minutes
      </Text>
      <Flex flex={1} />
      <Button p="4" onPress={onNext}>
        OK
      </Button>
    </Flex>
  )
}
