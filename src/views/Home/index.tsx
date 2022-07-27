import * as SplashScreen from 'expo-splash-screen'
import { Button, Flex, Image, Text } from 'native-base'
import { StatusBar } from 'react-native'
import { restaurantName } from 'src/data'
import { RootStackScreenProps } from 'src/routes/RootStack'

export const Home = (props: RootStackScreenProps<'Home'>) => {
  const { navigation } = props

  return (
    <Flex
      flex={1}
      bg="background"
      pt={StatusBar.currentHeight + 'px'}
      onLayout={SplashScreen.hideAsync}
    >
      <Text alignSelf="center" p="2" fontSize="2xl" color="red.900" bold>
        {restaurantName}
      </Text>
      <Flex flex={1}>
        <Image
          alt="Pizza"
          flex={1}
          style={{ aspectRatio: 1 }}
          source={{
            uri: 'http://images2.fanpop.com/images/photos/7300000/Slice-of-Pizza-pizza-7383219-1600-1200.jpg',
          }}
          resizeMode="cover"
        />
      </Flex>
      <Button
        alignSelf="stretch"
        p="4"
        onPress={() => navigation.navigate('Categories')}
      >
        Fazer Pedido
      </Button>
    </Flex>
  )
}
