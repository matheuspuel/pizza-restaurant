import { Button, Flex, Image, Text } from 'native-base'
import scooterDeliveryImage from 'src/assets/images/scooter-delivery.png'
import { t } from 'src/i18n'
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
        {t('order_received')}
      </Text>
      <Flex flex={1} />
      <Image
        alt={t('delivery')}
        w={250}
        h={250}
        alignSelf="center"
        source={scooterDeliveryImage}
      />
      <Text textAlign="center" fontSize="2xl">
        {t('estimated_delivery_time')}:
      </Text>
      <Text textAlign="center" fontSize="2xl">
        45 {t('minutes')}
      </Text>
      <Flex flex={1} />
      <Button p="4" onPress={onNext}>
        {t('ok')}
      </Button>
    </Flex>
  )
}
