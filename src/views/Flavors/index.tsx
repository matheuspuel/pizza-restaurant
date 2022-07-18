import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet'
import { useState } from 'react'
import { Alert, Button, ScrollView, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { flavors, sizes } from 'src/data'
import {
  Flavor,
  sortByName,
  sortByPopularity,
  sortByPrice,
  sortByRecommended,
} from 'src/domain/flavor'
import { addPizza, changePizzaFlavors, getOrder } from 'src/redux/slices/order'
import { useAppDispatch, useAppSelector } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { absurd } from 'src/utils/function'
import { sort } from 'src/utils/sort'
import { hasEveryWord } from 'src/utils/string'
import { FlavorItem } from './components/FlavorItem'
import {
  FlavorCountText,
  FooterFlavorsContainer,
  FooterFlavorText,
  Header,
  Title,
} from './styles'

const sortOptions = ['Name', 'Price', 'Popularity', 'Recommended'] as const
const filterOptions = ['All', 'Salty', 'Sweet', 'Vegetarian'] as const

const Flavors_ = (props: RootStackScreenProps<'Flavors'>) => {
  const { navigation } = props
  const { sizeId, itemIndex } = props.route.params
  const dispatch = useAppDispatch()
  const order = useAppSelector(getOrder)
  const { showActionSheetWithOptions } = useActionSheet()
  const [sortBy, setSortBy] =
    useState<typeof sortOptions[number]>('Recommended')
  const [filterBy, setFilterBy] = useState<typeof filterOptions[number]>('All')
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<Array<Flavor['id']>>(
    itemIndex === undefined ? [] : order.pizzas[itemIndex]?.flavorIds ?? []
  )

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
    if (selectedIds.length < 1)
      return Alert.alert('Error', 'Select at least one flavor')
    if (itemIndex === undefined) {
      dispatch(addPizza({ sizeId, flavorIds: selectedIds, quantity: 1 }))
      navigation.popToTop()
      navigation.replace('Summary')
    } else {
      dispatch(changePizzaFlavors({ itemIndex, flavorIds: selectedIds }))
      navigation.navigate('Summary')
    }
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
        <FlavorCountText>
          {selectedIds.length} / {maxFlavors}
        </FlavorCountText>
        <FooterFlavorsContainer>
          {selectedIds.map((id, i) => (
            <FooterFlavorText key={i}>
              • {flavors[id]?.name ?? '-'}
            </FooterFlavorText>
          ))}
        </FooterFlavorsContainer>
        <View style={{ padding: 4 }}>
          <Button title="Next" onPress={onNext} />
        </View>
      </View>
    </>
  )
}

export const Flavors = connectActionSheet(Flavors_)
