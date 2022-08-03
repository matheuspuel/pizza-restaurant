import {
  Actionsheet,
  Button,
  FlatList,
  Flex,
  Text,
  TextArea,
  useDisclose,
} from 'native-base'
import { useState } from 'react'
import { Alert } from 'react-native'
import { flavors as allFlavors, sizes } from 'src/data'
import { Flavor } from 'src/domain/flavor'
import { t } from 'src/i18n'
import { getAuthentication } from 'src/redux/slices/authentication'
import { getOrder, removePizza, setObservation } from 'src/redux/slices/order'
import { useAppDispatch, useAppSelector } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { toCurrency } from 'src/utils/number'
import { OrderItem } from './components/OrderItem'

export const Summary = (props: RootStackScreenProps<'Summary'>) => {
  const { navigation } = props
  const dispatch = useAppDispatch()
  const order = useAppSelector(getOrder)
  const authentication = useAppSelector(getAuthentication)
  const modal = useDisclose()
  const [selected, setSelected] = useState<{
    item: typeof pizzas[number]
    index: number
  }>()

  const pizzas = order.pizzas.map(p => {
    const size = sizes[p.sizeId]
    const flavors = p.flavorIds
      .map(id => allFlavors[id])
      .filter((f): f is Flavor => f !== undefined)
    const quantity = p.quantity
    const price =
      (quantity * flavors.reduce((acc, f) => acc + f.prices[p.sizeId], 0)) /
      flavors.length
    return { size, flavors, quantity, price }
  })

  const totalPrice = pizzas.reduce((acc, p) => acc + p.price, 0)

  const onNext = () => {
    if (pizzas.length <= 0) {
      Alert.alert('Error', 'Add at least one item')
    } else if (!authentication.authenticated) {
      navigation.navigate('Address')
    } else {
      navigation.replace('Finished')
    }
  }

  return (
    <Flex flex={1}>
      <FlatList
        flex={1}
        data={pizzas}
        renderItem={({ item, index }) => (
          <OrderItem
            data={item}
            index={index}
            onPress={() => {
              modal.onOpen()
              setSelected({ item, index })
            }}
          />
        )}
      />
      <Flex p="1">
        <Text alignSelf="flex-end" p="1">
          {t('total')}:{' '}
          <Text alignSelf="flex-end" p="1" bold>
            {toCurrency(totalPrice)}
          </Text>
        </Text>
        <Flex p="1">
          <TextArea
            autoCompleteType={undefined}
            value={order.observation}
            onChangeText={t => dispatch(setObservation(t))}
            placeholder={t('observations')}
            bg="white"
          />
        </Flex>
        <Flex p="1">
          <Button onPress={() => navigation.navigate('Sizes')}>
            {t('add_item')}
          </Button>
        </Flex>
        <Flex p="1">
          <Button onPress={onNext}>
            {authentication.authenticated ? t('confirm_order') : t('next')}
          </Button>
        </Flex>
      </Flex>
      <Actionsheet isOpen={modal.isOpen} onClose={modal.onClose}>
        <Actionsheet.Content>
          <Flex w="full" h={60} px="4" justify="center">
            <Text fontSize="md" color="gray.500">
              {t('actions')}
            </Text>
          </Flex>
          <Actionsheet.Item
            onPress={() =>
              selected &&
              navigation.navigate('Sizes', { itemIndex: selected.index })
            }
          >
            {t('change_size')}
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() =>
              selected &&
              navigation.navigate('Flavors', {
                itemIndex: selected.index,
                sizeId: selected.item.size.id,
              })
            }
          >
            {t('change_flavors')}
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() =>
              selected && dispatch(removePizza({ itemIndex: selected.index }))
            }
          >
            {t('remove_item')}
          </Actionsheet.Item>
          <Actionsheet.Item>{t('cancel')}</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Flex>
  )
}
