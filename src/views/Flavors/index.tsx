import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet'
import { useState } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { flavors, sizes } from 'src/data'
import {
  Flavor,
  sortByName,
  sortByPopularity,
  sortByPrice,
  sortByRecommended,
} from 'src/domain/flavor'
import { PizzaSizeId } from 'src/domain/size'
import { addPizza } from 'src/redux/slices/order'
import { useAppDispatch } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { rangeArray } from 'src/utils/array'
import { absurd } from 'src/utils/function'
import { toCurrency } from 'src/utils/number'
import { sort } from 'src/utils/sort'
import { hasEveryWord } from 'src/utils/string'
import {
  CheckedIcon,
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
  const { navigation } = props
  const { sizeId } = props.route.params
  const dispatch = useAppDispatch()
  const { showActionSheetWithOptions } = useActionSheet()
  const [sortBy, setSortBy] =
    useState<typeof sortOptions[number]>('Recommended')
  const [filterBy, setFilterBy] = useState<typeof filterOptions[number]>('All')
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<Array<Flavor['id']>>([])

  const maxFlavors = sizes[sizeId].maxFlavors

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

  const onNext = () => {
    if (selectedIds.length < 1) return
    dispatch(addPizza({ sizeId, flavorIds: selectedIds }))
    navigation.navigate('Summary')
  }

  const flavorsArray = Object.values(flavors)

  const filteredFlavors =
    filterBy === 'All'
      ? flavorsArray
      : flavorsArray.filter(f =>
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
      <ScrollView contentContainerStyle={{ padding: 4 }}>
        {sortedFlavors.map(f => (
          <FlavorItem
            key={f.id}
            data={f}
            sizeId={sizeId}
            selected={selectedIds.includes(f.id)}
            onPress={() =>
              setSelectedIds(prev =>
                prev.includes(f.id)
                  ? prev.filter(id => id !== f.id)
                  : selectedIds.length < maxFlavors
                  ? [...prev, f.id]
                  : prev
              )
            }
          />
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
        <Text style={{ fontWeight: '700', fontSize: 18, padding: 4 }}>
          {selectedIds.length} / {maxFlavors}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: 4,
          }}
        >
          {selectedIds.map((id, i) => (
            <Text key={i} style={{ paddingLeft: 4 }}>
              • {flavors[id]?.name ?? '-'}
            </Text>
          ))}
        </View>
        <View style={{ padding: 4 }}>
          <Button title="Next" onPress={onNext} />
        </View>
      </View>
    </>
  )
}

export const Flavors = connectActionSheet(Flavors0)

const FlavorItem = (props: {
  data: Flavor
  sizeId: PizzaSizeId
  selected?: boolean
  onPress: () => void
}) => {
  const { name, description, prices, tags, spiceLevel, oldPrices } = props.data
  const price = prices[props.sizeId]
  const oldPrice = oldPrices?.[props.sizeId]

  return (
    <ItemButton sweet={tags?.sweet} onPress={props.onPress}>
      <View style={{ flexDirection: 'row' }}>
        <ItemTitle>{name}</ItemTitle>
        {tags?.recommended && <RecommendedIcon />}
        {tags?.vegetarian && <VegetarianIcon />}
        <View style={{ marginRight: 6 }}></View>
        {rangeArray(spiceLevel).map(i => (
          <SpiceIcon key={i} />
        ))}
        <Price price={price} oldPrice={oldPrice} />
      </View>
      <View style={{ flexDirection: 'row', minHeight: 25 }}>
        <ItemDescription>{description}</ItemDescription>
        {props.selected && <CheckedIcon />}
      </View>
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
