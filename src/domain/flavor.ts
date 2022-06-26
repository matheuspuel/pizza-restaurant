import { PizzaSizeId } from './size'

export type Flavor = {
  id: number
  name: string
  description: string
  prices: Record<PizzaSizeId, number>
  spiceLevel?: SpiceLevel
  vegetarian?: boolean
}

export type SpiceLevel = 0 | 1 | 2 | 3
