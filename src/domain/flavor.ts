import { contramapSort, sortNumber, sortString } from 'src/utils/sort'
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

export const sortByName = contramapSort((a: Flavor) => a.name)(sortString)

export const sortByPrice = (sizeId: PizzaSizeId) =>
  contramapSort((a: Flavor) => a.prices[sizeId])(sortNumber)
