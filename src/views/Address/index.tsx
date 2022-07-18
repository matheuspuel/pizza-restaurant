import React, { useRef } from 'react'
import { Button, ScrollView, Text, TextInput, View } from 'react-native'
import { useValidationState } from 'src/hooks/useValidationState'
import { setAuthentication } from 'src/redux/slices/authentication'
import { useAppDispatch } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'

export const Address = (props: RootStackScreenProps<'Address'>) => {
  const { navigation } = props
  const dispatch = useAppDispatch()
  const inputRefs = [
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
  ] as const
  const phone = useValidationState({
    validate: v => (v.length > 0 ? [] : ['Required Field']),
  })
  const city = useValidationState({
    validate: v => (v.length > 0 ? [] : ['Required Field']),
  })
  const street = useValidationState({
    validate: v => (v.length > 0 ? [] : ['Required Field']),
  })
  const number = useValidationState({
    validate: v => (v.length > 0 ? [] : ['Required Field']),
  })
  const complement = useValidationState({ validate: v => [] })

  const fields = { phone, city, street, number, complement }

  const hasSomeError = Object.values(fields).some(f => f.errors.length > 0)

  const onSave = () => {
    const allErrors = Object.values(fields).map(f => f.updateErrors())
    if (allErrors.some(e => e.length > 0)) return
    else {
      dispatch(setAuthentication({ authenticated: true }))
      navigation.navigate('Summary')
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 4 }}
      keyboardShouldPersistTaps="handled"
    >
      <CustomInput
        title="Phone Number"
        errors={phone.errors}
        required
        inputRef={inputRefs[0]}
        placeholder="11 912341234"
        value={phone.value}
        onChangeText={t => {
          phone.setValue(t)
          phone.clearErrors()
        }}
        onBlur={phone.updateErrors}
        onSubmitEditing={() => inputRefs[1].current?.focus()}
        autoFocus
        keyboardType="numeric"
      />
      <CustomInput
        title="City"
        errors={city.errors}
        required
        inputRef={inputRefs[1]}
        placeholder="São Paulo"
        value={city.value}
        onChangeText={t => {
          city.setValue(t)
          city.clearErrors()
        }}
        onBlur={city.updateErrors}
        onSubmitEditing={() => inputRefs[2].current?.focus()}
      />
      <CustomInput
        title="Street"
        errors={street.errors}
        required
        inputRef={inputRefs[2]}
        placeholder="Rua Brasil"
        value={street.value}
        onChangeText={t => {
          street.setValue(t)
          street.clearErrors()
        }}
        onBlur={street.updateErrors}
        onSubmitEditing={() => inputRefs[3].current?.focus()}
      />
      <CustomInput
        title="Number"
        errors={number.errors}
        required
        inputRef={inputRefs[3]}
        placeholder="87"
        value={number.value}
        onChangeText={t => {
          number.setValue(t)
          number.clearErrors()
        }}
        onBlur={number.updateErrors}
        onSubmitEditing={() => inputRefs[4].current?.focus()}
      />
      <CustomInput
        title="Complement"
        errors={complement.errors}
        inputRef={inputRefs[4]}
        placeholder="ap 101"
        value={complement.value}
        onChangeText={t => {
          complement.setValue(t)
          complement.clearErrors()
        }}
        onBlur={complement.updateErrors}
        onSubmitEditing={onSave}
      />
      <View style={{ flex: 1 }} />
      <View style={{ padding: 4 }}>
        <Button title="Save" onPress={onSave} disabled={hasSomeError} />
      </View>
    </ScrollView>
  )
}

const CustomInput = ({
  title,
  errors,
  inputRef,
  required,
  ...textInputProps
}: React.ComponentProps<typeof TextInput> & {
  inputRef?: React.LegacyRef<TextInput>
  title: string
  errors: string[]
  required?: boolean
}) => {
  return (
    <View style={{ padding: 4 }}>
      <Text>{title + (required ? ' *' : '')}</Text>
      <TextInput
        returnKeyType="next"
        blurOnSubmit={false}
        {...textInputProps}
        ref={inputRef}
        style={[
          {
            padding: 8,
            borderWidth: 1,
            borderColor: '#bfbfbf',
            backgroundColor: '#ffffff',
            borderRadius: 4,
          },
          textInputProps.style,
        ]}
      />
      <InputErrors errors={errors} />
    </View>
  )
}

const InputErrors = (props: { errors: string[] }) => {
  return (
    <>
      {props.errors.map((e, i) => (
        <Text key={i} style={{ color: '#df0000', fontSize: 12 }}>
          {e}
        </Text>
      ))}
    </>
  )
}
