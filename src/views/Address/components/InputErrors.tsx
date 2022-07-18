import { InputErrorText } from '../styles'

export const InputErrors = (props: { errors: string[] }) => {
  return (
    <>
      {props.errors.map((e, i) => (
        <InputErrorText key={i}>{e}</InputErrorText>
      ))}
    </>
  )
}
