import { Flex } from 'native-base'
import { Alert } from 'react-native'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { CategoryButton } from './components/CategoryButton'

export const Categories = (props: RootStackScreenProps<'Categories'>) => {
  const { navigation } = props

  return (
    <Flex flex={1} justify="space-evenly" p="2">
      <CategoryButton onPress={() => navigation.navigate('Sizes')}>
        Pizza
      </CategoryButton>
      <CategoryButton onPress={() => Alert.alert('Error', 'Not implemented')}>
        Drinks
      </CategoryButton>
      <CategoryButton onPress={() => Alert.alert('Error', 'Not implemented')}>
        Other
      </CategoryButton>
    </Flex>
  )
}
