import { restaurantName } from 'src/data'
import { RootStackScreenProps } from 'src/routes/RootStack'
import {
  Container,
  Image,
  ImageContainer,
  OrderButton,
  OrderButtonText,
  RestaurantName,
} from './styles'

export const Home = (props: RootStackScreenProps<'Home'>) => {
  const { navigation } = props

  return (
    <Container>
      <RestaurantName>{restaurantName}</RestaurantName>
      <ImageContainer>
        <Image
          source={{
            uri: 'http://images2.fanpop.com/images/photos/7300000/Slice-of-Pizza-pizza-7383219-1600-1200.jpg',
          }}
          resizeMode="cover"
        />
      </ImageContainer>
      <OrderButton onPress={() => navigation.navigate('Categories')}>
        <OrderButtonText>Fazer Pedido</OrderButtonText>
      </OrderButton>
    </Container>
  )
}
