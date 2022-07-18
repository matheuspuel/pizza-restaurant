import { Alert } from 'react-native'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { CategoryButton } from './components/CategoryButton'
import { CategoriesContainer } from './styles'

export const Categories = (props: RootStackScreenProps<'Categories'>) => {
  const { navigation } = props

  return (
    <CategoriesContainer>
      <CategoryButton onPress={() => navigation.navigate('Sizes')}>
        Pizza
      </CategoryButton>
      <CategoryButton onPress={() => Alert.alert('Error', 'Not implemented')}>
        Drinks
      </CategoryButton>
      <CategoryButton onPress={() => Alert.alert('Error', 'Not implemented')}>
        Other
      </CategoryButton>
    </CategoriesContainer>
  )
}
