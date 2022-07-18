import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.background};
  justify-content: space-evenly;
`

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'MADE_TOMMY_700Bold';
  text-align: center;
`

export const ItemButton = styled.TouchableOpacity`
  flex: 1;
  padding: 4px;
  border-radius: 8px;
`

export const ItemTitle = styled.Text`
  font-size: 16px;
  font-family: 'MADE_TOMMY_700Bold';
`

export const ItemSlices = styled.Text`
  font-family: 'MADE_TOMMY_400Regular';
`

export const ItemCentimeters = styled.Text`
  font-family: 'MADE_TOMMY_400Regular';
`

export const ItemPrice = styled.Text`
  font-family: 'MADE_TOMMY_400Regular';
`

export const ItemFlavors = styled.Text`
  font-family: 'MADE_TOMMY_400Regular';
`

export const ItemPriceValue = styled.Text`
  font-size: 14px;
  font-family: 'MADE_TOMMY_500Medium';
`
