import { Button, ScrollView, View } from 'react-native'
import { flavors } from 'src/data'
import {
  Flavor,
  sortByName,
  sortByPopularity,
  sortByPrice,
} from 'src/domain/flavor'
import {
  Header,
  ItemButton,
  ItemDescription,
  ItemTitle,
  Price,
  RecommendedIcon,
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
import { absurd } from 'src/utils/function'
import { sort } from 'src/utils/sort'

const sortByOptions = ['Name', 'Price', 'Popularity'] as const

const Flavors0 = (props: RootStackScreenProps<'Flavors'>) => {
  const { sizeId } = props.route.params
  const { showActionSheetWithOptions } = useActionSheet()

  const [sortBy, setSortBy] =
    useState<typeof sortByOptions[number]>('Popularity')

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

  const sortedFlavors = sort(
    flavors,
    sortBy === 'Name'
      ? sortByName
      : sortBy === 'Price'
      ? sortByPrice(sizeId)
      : sortBy === 'Popularity'
      ? sortByPopularity
      : absurd(sortBy)
  )

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
  const { name, description, prices, tags, spiceLevel } = props.data
  const price = prices[props.sizeId]

  return (
    <ItemButton sweet={tags?.sweet}>
      <View style={{ flexDirection: 'row' }}>
        <ItemTitle>{name}</ItemTitle>
        {tags?.recommended && <RecommendedIcon />}
        {tags?.vegetarian && <VegetarianIcon />}
        {rangeArray(spiceLevel).map(i => (
          <SpiceIcon key={i} />
        ))}
        <Price>{toCurrency(price)}</Price>
      </View>
      <ItemDescription>{description}</ItemDescription>
    </ItemButton>
  )
}
