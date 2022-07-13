import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet'
import { useState } from 'react'
import { Button, ScrollView, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { flavors } from 'src/data'
import {
  Flavor,
  sortByName,
  sortByPopularity,
  sortByPrice,
  sortByRecommended,
} from 'src/domain/flavor'
import { PizzaSizeId } from 'src/domain/size'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { rangeArray } from 'src/utils/array'
import { absurd } from 'src/utils/function'
import { toCurrency } from 'src/utils/number'
import { sort } from 'src/utils/sort'
import { hasEveryWord } from 'src/utils/string'
import {
  Header,
  ItemButton,
  ItemDescription,
  ItemTitle,
  OldPriceText,
  OnSaleIcon,
  PriceText,
  RecommendedIcon,
  SpiceIcon,
  Title,
  VegetarianIcon,
} from './styles'

const sortOptions = ['Name', 'Price', 'Popularity', 'Recommended'] as const
const filterOptions = ['All', 'Salty', 'Sweet', 'Vegetarian'] as const

const Flavors0 = (props: RootStackScreenProps<'Flavors'>) => {
  const { sizeId } = props.route.params
  const { showActionSheetWithOptions } = useActionSheet()

  const [sortBy, setSortBy] =
    useState<typeof sortOptions[number]>('Recommended')

  const [filterBy, setFilterBy] = useState<typeof filterOptions[number]>('All')

  const [search, setSearch] = useState('')

  const showSortBy = () =>
    showActionSheetWithOptions(
      {
        options: [...sortOptions, 'Cancel'],
        title: 'Sort by',
        destructiveButtonIndex: sortOptions.length,
      },
      i => {
        const type = sortOptions[i ?? -1]
        if (type !== undefined) setSortBy(type)
      }
    )

  const filteredFlavors =
    filterBy === 'All'
      ? flavors
      : flavors.filter(f =>
          filterBy === 'Salty'
            ? !f.tags?.sweet
            : filterBy === 'Sweet'
            ? f.tags?.sweet
            : filterBy === 'Vegetarian'
            ? f.tags?.vegetarian
            : absurd(filterBy)
        )

  const searchedFlavors = filteredFlavors.filter(f =>
    hasEveryWord([f.name, f.description], search)
  )

  const sortedFlavors = sort(
    searchedFlavors,
    sortBy === 'Name'
      ? sortByName
      : sortBy === 'Price'
      ? sortByPrice(sizeId)
      : sortBy === 'Popularity'
      ? sortByPopularity
      : sortBy === 'Recommended'
      ? sortByRecommended(sizeId)
      : absurd(sortBy)
  )

  return (
    <>
      <Header>
        <Title>Flavors</Title>
        <TextInput
          style={{ padding: 8, margin: 8, backgroundColor: '#ffffff' }}
          value={search}
          onChangeText={setSearch}
        />
        <Button title="Sort by" onPress={showSortBy} />
        <Title>Filters</Title>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          {filterOptions.map(op => (
            <Button key={op} title={op} onPress={() => setFilterBy(op)} />
          ))}
        </View>
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
  const { name, description, prices, tags, spiceLevel, oldPrices } = props.data
  const price = prices[props.sizeId]
  const oldPrice = oldPrices?.[props.sizeId]

  return (
    <ItemButton sweet={tags?.sweet}>
      <View style={{ flexDirection: 'row' }}>
        <ItemTitle>{name}</ItemTitle>
        {tags?.recommended && <RecommendedIcon />}
        {tags?.vegetarian && <VegetarianIcon />}
        {rangeArray(spiceLevel).map(i => (
          <SpiceIcon key={i} />
        ))}
        <Price price={price} oldPrice={oldPrice} />
      </View>
      <ItemDescription>{description}</ItemDescription>
    </ItemButton>
  )
}

const Price = (props: { price: number; oldPrice?: number }) => {
  const { price, oldPrice } = props

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
      {oldPrice === undefined ? null : (
        <>
          <OnSaleIcon />
          <OldPriceText>{toCurrency(oldPrice)}</OldPriceText>
        </>
      )}
      <PriceText>{toCurrency(price)}</PriceText>
    </View>
  )
}
