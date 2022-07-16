import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

export const Header = styled.View`
  padding: 8px;
`

export const Title = styled.Text`
  text-align: center;
`

export const ItemButton = styled.TouchableOpacity<{ sweet?: boolean }>`
  margin: 4px;
  padding: 8px;
  border-width: 1px;
  border-radius: 8px;
  background-color: ${({ theme, sweet }) =>
    sweet ? '#bc9c87' : theme.color.yellow_100};
`

export const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-right: 8px;
`

export const ItemDescription = styled.Text`
  flex: 1;
`

export const VegetarianIcon = styled(MaterialCommunityIcons).attrs({
  name: 'leaf',
})`
  color: ${({ theme }) => theme.color.green_700};
  font-size: 24px;
  margin-right: 8px;
`

export const RecommendedIcon = styled(MaterialCommunityIcons).attrs({
  name: 'star',
})`
  color: ${({ theme }) => theme.color.yellow_600};
  font-size: 24px;
  margin-right: 8px;
`

export const SpiceIcon = styled(MaterialCommunityIcons).attrs({
  name: 'fire',
})`
  color: ${({ theme }) => theme.color.red_700};
  font-size: 24px;
  margin-left: -12px;
`

export const OnSaleIcon = styled(MaterialCommunityIcons).attrs({
  name: 'sale',
})`
  color: ${({ theme }) => theme.color.red_700};
  font-size: 24px;
  margin-right: 8px;
`

export const CheckedIcon = styled(MaterialCommunityIcons).attrs({
  name: 'check-bold',
})`
  color: ${({ theme }) => theme.color.green_700};
  font-size: 24px;
  margin-left: 4px;
  margin-right: 6px;
`

export const PriceText = styled.Text`
  font-size: 16px;
  font-weight: 500;
`

export const OldPriceText = styled(PriceText)`
  text-decoration-line: line-through;
  margin-right: 8px;
`
