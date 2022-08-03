import { Button, Flex, ScrollView } from 'native-base'
import React, { useRef } from 'react'
import { TextInput } from 'react-native'
import { useValidationState } from 'src/hooks/useValidationState'
import { t } from 'src/i18n'
import { setAuthentication } from 'src/redux/slices/authentication'
import { useAppDispatch } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'
import { CustomInput } from './components/CustomInput'

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
    validate: v => (v.length > 0 ? [] : [t('required_field')]),
  })
  const city = useValidationState({
    validate: v => (v.length > 0 ? [] : [t('required_field')]),
  })
  const street = useValidationState({
    validate: v => (v.length > 0 ? [] : [t('required_field')]),
  })
  const number = useValidationState({
    validate: v => (v.length > 0 ? [] : [t('required_field')]),
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
        title={t('phone_number')}
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
        title={t('city')}
        errors={city.errors}
        required
        inputRef={inputRefs[1]}
        placeholder={t('city_placeholder')}
        value={city.value}
        onChangeText={t => {
          city.setValue(t)
          city.clearErrors()
        }}
        onBlur={city.updateErrors}
        onSubmitEditing={() => inputRefs[2].current?.focus()}
      />
      <CustomInput
        title={t('street')}
        errors={street.errors}
        required
        inputRef={inputRefs[2]}
        placeholder={t('street_placeholder')}
        value={street.value}
        onChangeText={t => {
          street.setValue(t)
          street.clearErrors()
        }}
        onBlur={street.updateErrors}
        onSubmitEditing={() => inputRefs[3].current?.focus()}
      />
      <CustomInput
        title={t('number')}
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
        title={t('complement')}
        errors={complement.errors}
        inputRef={inputRefs[4]}
        placeholder={t('complement_placeholder')}
        value={complement.value}
        onChangeText={t => {
          complement.setValue(t)
          complement.clearErrors()
        }}
        onBlur={complement.updateErrors}
        onSubmitEditing={onSave}
      />
      <Flex style={{ flex: 1 }} />
      <Button m="1" onPress={onSave} isDisabled={hasSomeError}>
        {t('save')}
      </Button>
    </ScrollView>
  )
}
