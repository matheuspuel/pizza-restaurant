import { CategoryButtonText, CategoryButtonTouchableOpacity } from '../styles'

export const CategoryButton = (props: {
  children: string
  onPress: () => void
}) => (
  <CategoryButtonTouchableOpacity onPress={props.onPress}>
    <CategoryButtonText>{props.children}</CategoryButtonText>
  </CategoryButtonTouchableOpacity>
)
