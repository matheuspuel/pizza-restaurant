import { View } from 'react-native'
import { toCurrency } from 'src/utils/number'
import { OldPriceText, OnSaleIcon, PriceText } from '../styles'

export const Price = (props: { price: number; oldPrice?: number }) => {
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
