import { Button, Text, View } from 'react-native'
import { flavors as allFlavors, sizes } from 'src/data'
import { Flavor } from 'src/domain/flavor'
import { getOrder } from 'src/redux/slices/order'
import { useAppSelector } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { toCurrency } from 'src/utils/number'

export const Summary = (props: RootStackScreenProps<'Summary'>) => {
  const { navigation } = props
  const order = useAppSelector(getOrder)

  const pizzas = order.pizzas.map(p => {
    const size = sizes[p.sizeId]
    const flavors = p.flavorIds
      .map(id => allFlavors[id])
      .filter((f): f is Flavor => f !== undefined)
    const price =
      flavors.reduce((acc, f) => acc + f.prices[p.sizeId], 0) / flavors.length
    return { size, flavors, price }
  })

  const totalPrice = pizzas.reduce((acc, p) => acc + p.price, 0)

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {pizzas.map((p, i) => (
          <View key={i} style={{ flexDirection: 'row', padding: 4 }}>
            <View style={{ padding: 4 }}>
              <Text>Pizza</Text>
              <Text>{p.size.name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                // justifyContent: 'center',
                flexWrap: 'wrap',
                padding: 4,
              }}
            >
              {p.flavors.map((f, i) => (
                <Text key={i} style={{ paddingLeft: 4 }}>
                  • {f.name}
                </Text>
              ))}
            </View>
            <Text style={{ padding: 4, fontWeight: '700' }}>
              {toCurrency(p.price)}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ padding: 4 }}>
        <Text style={{ alignSelf: 'flex-end', padding: 4 }}>
          Total:{' '}
          <Text style={{ fontWeight: '700' }}>{toCurrency(totalPrice)}</Text>
        </Text>
        <View style={{ padding: 4 }}>
          <Button
            title="Add Item"
            onPress={() => navigation.navigate('Categories')}
          />
        </View>
        <View style={{ padding: 4 }}>
          <Button title="Finish Order" />
        </View>
      </View>
    </View>
  )
}
