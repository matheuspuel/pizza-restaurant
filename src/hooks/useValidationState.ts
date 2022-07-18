import { useState } from 'react'

export const useValidationState = (args: {
  validate: (v: string) => string[]
  initial?: string
}) => {
  const [value, setValue] = useState(args.initial ?? '')
  const [errors, setErrors] = useState<string[]>([])

  const validate = args.validate
  const validateState = () => validate(value)
  const updateErrors = () => {
    const errors = validateState()
    setErrors(errors)
    return errors
  }
  const clearErrors = () => setErrors([])

  return {
    value,
    setValue,
    errors,
    setErrors,
    validate,
    validateState,
    updateErrors,
    clearErrors,
  }
}
