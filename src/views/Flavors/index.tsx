import { View } from 'react-native'
import { flavors } from 'src/data'
import { Flavor } from 'src/domain/flavor'
import {
  Container,
  ItemButton,
  ItemDescription,
  ItemTitle,
  Price,
  SpiceIcon,
  Title,
  VegetarianIcon,
} from './styles'
import { rangeArray } from 'src/utils/array'
import { toCurrency } from 'src/utils/number'
import { PizzaSizeId } from 'src/domain/size'
import { RootStackScreenProps } from 'src/routes/RootStack'

export const Flavors = (props: RootStackScreenProps<'Flavors'>) => {
  const { sizeId } = props.route.params

  return (
    <Container>
      <Title>Flavors</Title>
      {flavors.map(f => (
        <FlavorItem key={f.id} data={f} sizeId={sizeId} />
      ))}
    </Container>
  )
}

const FlavorItem = (props: { data: Flavor; sizeId: PizzaSizeId }) => {
  const { name, description, prices, vegetarian, spiceLevel } = props.data
  const price = prices[props.sizeId]

  return (
    <ItemButton>
      <View style={{ flexDirection: 'row' }}>
        <ItemTitle>{name}</ItemTitle>
        {vegetarian && <VegetarianIcon />}
        {rangeArray(spiceLevel).map(i => (
          <SpiceIcon key={i} />
        ))}
        <Price>{toCurrency(price)}</Price>
      </View>
      <ItemDescription>{description}</ItemDescription>
    </ItemButton>
  )
}
