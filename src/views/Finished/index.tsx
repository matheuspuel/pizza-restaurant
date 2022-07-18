import { Button, Image, Text, View } from 'react-native'
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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 28,
          fontFamily: 'MADE_TOMMY_700Bold',
        }}
      >
        Order Received
      </Text>
      <View style={{ flex: 1 }} />
      <Image
        source={scooterDeliveryImage}
        width={250}
        height={250}
        style={{ alignSelf: 'center', width: 250, height: 250 }}
      />
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontFamily: 'MADE_TOMMY_400Regular',
          }}
        >
          Estimated delivery time:
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            fontFamily: 'MADE_TOMMY_400Regular',
          }}
        >
          45 minutes
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      <Button title="OK" onPress={onNext} />
    </View>
  )
}