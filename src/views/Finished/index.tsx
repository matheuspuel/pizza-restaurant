import { Button, View } from 'react-native'
import scooterDeliveryImage from 'src/assets/images/scooter-delivery.png'
import { clearOrder } from 'src/redux/slices/order'
import { useAppDispatch } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { HeaderText, StyledImage, TimeLabel, TimeText } from './styles'

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
      <HeaderText>Order Received</HeaderText>
      <View style={{ flex: 1 }} />
      <StyledImage source={scooterDeliveryImage} />
      <View>
        <TimeLabel>Estimated delivery time:</TimeLabel>
        <TimeText>45 minutes</TimeText>
      </View>
      <View style={{ flex: 1 }} />
      <Button title="OK" onPress={onNext} />
    </View>
  )
}
