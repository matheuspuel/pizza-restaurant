import { Button } from 'native-base'

export const CategoryButton = (props: {
  children: string
  onPress: () => void
}) => (
  <Button
    onPress={props.onPress}
    m="2"
    p="8"
    _text={{ bold: true, fontSize: '4xl' }}
  >
    {props.children}
  </Button>
)
