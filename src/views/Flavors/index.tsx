import { Button, ScrollView, View } from 'react-native'
import { flavors } from 'src/data'
import { Flavor, sortByName, sortByPrice } from 'src/domain/flavor'
import {
  Header,
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
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet'
import { useState } from 'react'

const sortByOptions = ['Name', 'Price'] as const

const Flavors0 = (props: RootStackScreenProps<'Flavors'>) => {
  const { sizeId } = props.route.params
  const { showActionSheetWithOptions } = useActionSheet()

  const [sortBy, setSortBy] = useState<typeof sortByOptions[number]>()

  const showSortBy = () =>
    showActionSheetWithOptions(
      {
        options: [...sortByOptions, 'Cancel'],
        title: 'Sort by',
        destructiveButtonIndex: sortByOptions.length,
      },
      i => {
        const type = sortByOptions[i ?? -1]
        if (type !== undefined) setSortBy(type)
      }
    )

  const sortedFlavors = sortBy
    ? flavors.sort(sortBy === 'Name' ? sortByName : sortByPrice(sizeId))
    : flavors

  return (
    <>
      <Header>
        <Title>Flavors</Title>
        <Button title="Sort by" onPress={showSortBy} />
      </Header>
      <ScrollView contentContainerStyle={{ padding: 8 }}>
        {sortedFlavors.map(f => (
          <FlavorItem key={f.id} data={f} sizeId={sizeId} />
        ))}
      </ScrollView>
    </>
  )
}

export const Flavors = connectActionSheet(Flavors0)

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
