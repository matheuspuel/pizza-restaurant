import { Button, Image, Text, View } from 'react-native'
import scooterDeliveryImage from 'src/assets/image/scooter-delivery.png'
import { RootStackScreenProps } from 'src/routes/RootStack'

export const Finished = (props: RootStackScreenProps<'Finished'>) => {
  const { navigation } = props

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}>
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
        <Text style={{ textAlign: 'center', fontSize: 24 }}>
          Estimated delivery time:
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>45 minutes</Text>
      </View>
      <View style={{ flex: 1 }} />
      <Button title="OK" onPress={() => navigation.replace('Home')} />
    </View>
  )
}
