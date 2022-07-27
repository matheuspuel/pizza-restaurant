import {
  Actionsheet,
  Button,
  Flex,
  Input,
  ScrollView,
  Text,
  useDisclose,
} from 'native-base'
import { useState } from 'react'
import { Alert } from 'react-native'
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

const sortOptions = ['Name', 'Price', 'Popularity', 'Recommended'] as const
const filterOptions = ['All', 'Salty', 'Sweet', 'Vegetarian'] as const

export const Flavors = (props: RootStackScreenProps<'Flavors'>) => {
  const { navigation } = props
  const { sizeId, itemIndex } = props.route.params
  const dispatch = useAppDispatch()
  const order = useAppSelector(getOrder)
  const [sortBy, setSortBy] =
    useState<typeof sortOptions[number]>('Recommended')
  const [filterBy, setFilterBy] = useState<typeof filterOptions[number]>('All')
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<Array<Flavor['id']>>(
    itemIndex === undefined ? [] : order.pizzas[itemIndex]?.flavorIds ?? []
  )
  const modal = useDisclose()
  const [modalSelected, setModalSelected] = useState<{}>()

  const maxFlavors = sizes[sizeId].maxFlavors

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
      <Flex p="2">
        <Input m="2" bg="white" value={search} onChangeText={setSearch} />
        <Button m="2" onPress={modal.onOpen}>
          Sort by
        </Button>
        <Flex my="2" direction="row" justify="space-evenly">
          {filterOptions.map(op => (
            <Button key={op} onPress={() => setFilterBy(op)}>
              {op}
            </Button>
          ))}
        </Flex>
      </Flex>
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
      <Flex direction="row" align="center" p="1">
        <Text p="1" bold fontSize="lg">
          {selectedIds.length} / {maxFlavors}
        </Text>
        <Flex flex={1} direction="row" justify="center" flexWrap="wrap" p="1">
          {selectedIds.map((id, i) => (
            <Text key={i} pl="1">
              • {flavors[id]?.name ?? '-'}
            </Text>
          ))}
        </Flex>
        <Button m="1" onPress={onNext}>
          Next
        </Button>
      </Flex>
      <Actionsheet isOpen={modal.isOpen} onClose={modal.onClose}>
        <Actionsheet.Content>
          <Flex w="full" h={60} px={4} justify="center">
            <Text fontSize="md" color="gray.500">
              Sort by
            </Text>
          </Flex>
          {sortOptions.map((o, i) => (
            <Actionsheet.Item
              key={o}
              onPress={() => {
                const type = sortOptions[i ?? -1]
                if (type !== undefined) setSortBy(type)
              }}
            >
              {o}
            </Actionsheet.Item>
          ))}
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}
