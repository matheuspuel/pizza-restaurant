import styled from 'styled-components/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background};
  padding: ${({ theme }) => theme.spacing.$2};
`

export const Title = styled.Text``

export const ItemButton = styled.TouchableOpacity`
  margin: ${({ theme }) => theme.spacing.$2};
  padding: ${({ theme }) => theme.spacing.$2};
  border-width: ${({ theme }) => theme.spacing.px};
  border-radius: ${({ theme }) => theme.spacing.$2};
  background-color: ${({ theme }) => theme.color.primary_500};
`

export const ItemTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-right: ${({ theme }) => theme.spacing.$2};
`

export const ItemDescription = styled.Text``

export const VegetarianIcon = styled(MaterialCommunityIcons).attrs({
  name: 'leaf',
})`
  color: ${({ theme }) => theme.color.green_700};
  font-size: ${({ theme }) => theme.size.md};
  margin-right: ${({ theme }) => theme.spacing.$2};
`

export const SpiceIcon = styled(MaterialCommunityIcons).attrs({
  name: 'fire',
})`
  color: ${({ theme }) => theme.color.red_700};
  font-size: ${({ theme }) => theme.size.md};
`

export const Price = styled.Text`
  flex: 1;
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`
