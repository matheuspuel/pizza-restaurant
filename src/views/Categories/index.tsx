import { Text, TouchableOpacity, View } from 'react-native'
import { RootStackScreenProps } from 'src/routes/RootStack'

export const Categories = (props: RootStackScreenProps<'Categories'>) => {
  const { navigation } = props

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 4,
      }}
    >
      <CategoryButton onPress={() => navigation.navigate('Sizes')}>
        Pizza
      </CategoryButton>
      <CategoryButton onPress={() => {}}>Drinks</CategoryButton>
      <CategoryButton onPress={() => {}}>Other</CategoryButton>
    </View>
  )
}

const CategoryButton = (props: { children: string; onPress: () => void }) => (
  <TouchableOpacity
    style={{
      margin: 8,
      padding: 32,
      borderRadius: 16,
      backgroundColor: '#ff7f7f',
    }}
    onPress={props.onPress}
  >
    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 32 }}>
      {props.children}
    </Text>
  </TouchableOpacity>
)
