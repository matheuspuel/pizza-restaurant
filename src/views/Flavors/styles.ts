import styled from 'styled-components/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background};
  padding: 8px;
`

export const Title = styled.Text``

export const ItemButton = styled.TouchableOpacity`
  margin: 8px;
  padding: 8px;
  border-width: 1px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.primary_500};
`

export const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-right: 8px;
`

export const ItemDescription = styled.Text``

export const VegetarianIcon = styled(MaterialCommunityIcons).attrs({
  name: 'leaf',
})`
  color: ${({ theme }) => theme.color.green_700};
  font-size: 24px;
  margin-right: 8px;
`

export const SpiceIcon = styled(MaterialCommunityIcons).attrs({
  name: 'fire',
})`
  color: ${({ theme }) => theme.color.red_700};
  font-size: 24px;
`

export const Price = styled.Text`
  flex: 1;
  text-align: right;
  font-size: 16px;
  font-weight: 500;
`
