import { MaterialIcons } from '@expo/vector-icons'
import {
  Actionsheet,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
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
import { t } from 'src/i18n'
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
      return Alert.alert(t('Error'), t('Select_one_flavor'))
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
      <Flex p="2" _light={{ bg: 'white' }} _dark={{ bg: 'black' }} shadow="2">
        <Flex direction="row">
          <Input
            flex={1}
            _light={{ bg: 'white' }}
            value={search}
            onChangeText={setSearch}
            InputRightElement={
              <Icon mr="2" size="xl" as={<MaterialIcons name="search" />} />
            }
          />
          <IconButton
            ml="2"
            variant="outline"
            onPress={modal.onOpen}
            icon={<Icon as={<MaterialIcons name="sort" />} />}
          />
        </Flex>
        <Flex mt="2" direction="row" justify="space-between">
          {filterOptions.map(op => (
            <Button
              key={op}
              variant={filterBy === op ? 'subtle' : 'solid'}
              onPress={() => setFilterBy(op)}
            >
              {t(op)}
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
      <Divider />
      <Flex
        direction="row"
        align="center"
        p="1"
        _light={{ bg: 'white' }}
        _dark={{ bg: 'black' }}
      >
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
          {t('next')}
        </Button>
      </Flex>
      <Actionsheet isOpen={modal.isOpen} onClose={modal.onClose}>
        <Actionsheet.Content>
          <Flex w="full" h={60} px={4} justify="center">
            <Text fontSize="md" color="gray.500">
              {t('sort_by')}
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
              {t(o)}
            </Actionsheet.Item>
          ))}
          <Actionsheet.Item>{t('cancel')}</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}
