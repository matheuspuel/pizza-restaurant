import { TextInput } from 'react-native'
import { InputContainer, InputHeader, StyledTextInput } from '../styles'
import { InputErrors } from './InputErrors'

export const CustomInput = ({
  title,
  errors,
  inputRef,
  required,
  ...textInputProps
}: React.ComponentProps<typeof TextInput> & {
  inputRef?: React.Ref<TextInput>
  title: string
  errors: string[]
  required?: boolean
}) => {
  return (
    <InputContainer>
      <InputHeader>{title + (required ? ' *' : '')}</InputHeader>
      <StyledTextInput
        returnKeyType="next"
        blurOnSubmit={false}
        {...textInputProps}
        ref={inputRef}
      />
      <InputErrors errors={errors} />
    </InputContainer>
  )
}
