import styled from 'styled-components/native'
import { StatusBar } from 'react-native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background};
  padding-top: ${StatusBar.currentHeight}px;
`

export const RestaurantName = styled.Text`
  align-self: center;
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.red_900};
  padding: ${({ theme }) => theme.spacing.$2};
`

export const ImageContainer = styled.View`
  flex: 1;
`

export const Image = styled.Image`
  flex: 1;
  aspect-ratio: 1;
`

export const OrderButton = styled.TouchableOpacity`
  align-self: stretch;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.$4};
  background-color: ${({ theme }) => theme.color.red_500};
`

export const OrderButtonText = styled.Text`
  color: ${({ theme }) => theme.color.text_contrast};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`
