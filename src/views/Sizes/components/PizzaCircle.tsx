import { View } from 'react-native'

export const PizzaCircle = (props: { centimeters: number }) => {
  const { centimeters } = props

  return (
    <View
      style={{
        backgroundColor: '#FFD631',
        borderColor: '#E7BC93',
        borderWidth: 6,
        height: centimeters * 2,
        width: centimeters * 2,
        borderRadius: 9999,
      }}
    />
  )
}
