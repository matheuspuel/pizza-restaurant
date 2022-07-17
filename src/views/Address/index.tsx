import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { setAuthentication } from 'src/redux/slices/authentication'
import { useAppDispatch } from 'src/redux/store'
import { RootStackScreenProps } from 'src/routes/RootStack'

export const Address = (props: RootStackScreenProps<'Address'>) => {
  const { navigation } = props
  const dispatch = useAppDispatch()
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')

  const onSave = () => {
    dispatch(setAuthentication({ authenticated: true }))
    navigation.navigate('Summary')
  }

  return (
    <View style={{ flex: 1, padding: 4 }}>
      <View style={{ padding: 4 }}>
        <Text>Phone Number</Text>
        <TextInput
          autoFocus
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
          placeholder="11 912341234"
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: '#bfbfbf',
            backgroundColor: '#ffffff',
            borderRadius: 4,
          }}
        />
      </View>
      <View style={{ padding: 4 }}>
        <Text>City</Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="São Paulo"
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: '#bfbfbf',
            backgroundColor: '#ffffff',
            borderRadius: 4,
          }}
        />
      </View>
      <View style={{ padding: 4 }}>
        <Text>Street</Text>
        <TextInput
          value={street}
          onChangeText={setStreet}
          placeholder="Rua Brasil"
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: '#bfbfbf',
            backgroundColor: '#ffffff',
            borderRadius: 4,
          }}
        />
      </View>
      <View style={{ padding: 4 }}>
        <Text>Number</Text>
        <TextInput
          value={number}
          onChangeText={setNumber}
          placeholder="87"
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: '#bfbfbf',
            backgroundColor: '#ffffff',
            borderRadius: 4,
          }}
        />
      </View>
      <View style={{ padding: 4 }}>
        <Text>Complement</Text>
        <TextInput
          value={complement}
          onChangeText={setComplement}
          placeholder="ap 101"
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: '#bfbfbf',
            backgroundColor: '#ffffff',
            borderRadius: 4,
          }}
        />
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ padding: 4 }}>
        <Button title="Save" onPress={onSave} />
      </View>
    </View>
  )
}
