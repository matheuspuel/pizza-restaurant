import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

export const TotalText = styled.Text`
  align-self: flex-end;
  padding: 4px;
  font-family: MADE_TOMMY_400Regular;
`

export const TotalPriceText = styled(TotalText)`
  font-family: MADE_TOMMY_700Bold;
`

export const ItemNameText = styled.Text`
  font-family: MADE_TOMMY_400Regular;
`

export const FlavorText = styled.Text`
  padding-left: 4px;
  font-family: MADE_TOMMY_400Regular;
`

export const ItemQuantityText = styled.Text`
  text-align: center;
  width: 20px;
  margin-left: 4px;
  margin-right: 4px;
  font-family: MADE_TOMMY_400Regular;
`

export const MinusIcon = styled(MaterialCommunityIcons).attrs({
  name: 'minus',
})`
  color: ${({ theme }) => theme.color.error};
  font-size: 24px;
`

export const PlusIcon = styled(MaterialCommunityIcons).attrs({
  name: 'plus',
})`
  color: ${({ theme }) => theme.color.success};
  font-size: 24px;
`

export const OrderItemPriceText = styled.Text`
  padding: 4px;
  font-family: MADE_TOMMY_700Bold;
`
