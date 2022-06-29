export type PizzaSizeInfo = {
  id: PizzaSizeId
  name: string
  centimeters: number
  slices: number
  maxFlavors: number
}

export type PizzaSizeId = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
