import {
  contramapSort,
  reverseSort,
  sortNumber,
  sortString,
} from 'src/utils/sort'
import { PizzaSizeId } from './size'

export type Flavor = {
  id: number
  name: string
  description: string
  prices: Record<PizzaSizeId, number>
  popularity: number
  spiceLevel?: SpiceLevel
  tags?: Partial<Record<FlavorTag, boolean>>
}

export type SpiceLevel = 0 | 1 | 2 | 3

export type FlavorTag = 'vegetarian' | 'sweet' | 'recommended'

export const sortByName = contramapSort((a: Flavor) => a.name)(sortString)

export const sortByPopularity = contramapSort((a: Flavor) => a.popularity)(
  reverseSort(sortNumber)
)

export const sortByPrice = (sizeId: PizzaSizeId) =>
  contramapSort((a: Flavor) => a.prices[sizeId])(sortNumber)
