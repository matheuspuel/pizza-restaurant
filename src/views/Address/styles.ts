import { TextInput } from 'react-native'
import styled from 'styled-components/native'

export const InputErrorText = styled.Text`
  color: #df0000;
  font-size: 12px;
  font-family: 'MADE_TOMMY_400Regular';
`

export const InputContainer = styled.View`
  padding: 4px;
`

export const InputHeader = styled.Text`
  font-family: 'MADE_TOMMY_400Regular';
`

export const StyledTextInput = styled(TextInput)`
  padding: 8px;
  border-width: 1px;
  border-color: #bfbfbf;
  background-color: #ffffff;
  border-radius: 4px;
`
