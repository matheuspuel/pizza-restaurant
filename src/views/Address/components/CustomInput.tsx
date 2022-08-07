import { FormControl, Input, WarningOutlineIcon } from 'native-base'

export const CustomInput = ({
  title,
  errors,
  inputRef,
  required,
  ...rest
}: React.ComponentProps<typeof Input> & {
  title: string
  errors: string[]
  inputRef: React.ComponentProps<typeof Input>['ref']
  required?: boolean
}) => {
  return (
    <FormControl p="2" isRequired={required} isInvalid={!!errors.length}>
      <FormControl.Label>{title}</FormControl.Label>
      <Input
        _light={{ bg: 'white' }}
        returnKeyType="next"
        blurOnSubmit={false}
        ref={inputRef}
        {...rest}
      />
      {errors.map((e, i) => (
        <FormControl.ErrorMessage
          key={i}
          leftIcon={<WarningOutlineIcon size="xs" />}
        >
          {e}
        </FormControl.ErrorMessage>
      ))}
    </FormControl>
  )
}
