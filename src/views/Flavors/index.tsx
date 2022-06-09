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

export const Flavors = () => {
  return (
    <Container>
      <Title>Flavors</Title>
      {flavors.map(f => (
        <FlavorItem key={f.id} data={f} />
      ))}
    </Container>
  )
}

const FlavorItem = (props: { data: Flavor }) => {
  const { name, description, price, vegetarian, spiceLevel } = props.data

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
