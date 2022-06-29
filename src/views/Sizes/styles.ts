import styled from 'styled-components/native'

export const Scroll = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background};
`

export const Container = styled.View`
  flex: 1;
  padding: 8px;
  justify-content: space-evenly;
`

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`

export const ItemButton = styled.TouchableOpacity`
  flex: 1;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
`

export const ItemTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
`

export const ItemSlices = styled.Text``

export const ItemCentimeters = styled.Text``

export const ItemPrice = styled.Text``

export const ItemPriceValue = styled.Text`
  font-size: 14px;
  font-weight: 500;
`
