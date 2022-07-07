import {
  combineSort,
  contramapSort,
  reverseSort,
  sortBoolean,
  sortNumber,
  sortString,
} from 'src/utils/sort'
import { PizzaSizeId } from './size'

export type Flavor = {
  id: number
  name: string
  description: string
  prices: Record<PizzaSizeId, number>
  oldPrices?: Partial<Record<PizzaSizeId, number>>
  popularity: number
  spiceLevel?: SpiceLevel
  tags?: Partial<Record<FlavorTag, boolean>>
}

export type SpiceLevel = 0 | 1 | 2 | 3

export type FlavorTag = 'vegetarian' | 'sweet' | 'recommended'

export const sortByName = contramapSort((a: Flavor) => a.name, sortString)

export const sortByPopularity = contramapSort(
  (a: Flavor) => a.popularity,
  reverseSort(sortNumber)
)

export const sortByRecommended = (sizeId: PizzaSizeId) =>
  combineSort(
    contramapSort(
      a => (a.oldPrices?.[sizeId] === undefined ? Infinity : a.prices[sizeId]),
      sortNumber
    ),
    contramapSort(a => a.tags?.recommended ?? false, reverseSort(sortBoolean)),
    sortByPopularity
  )

export const sortByPrice = (sizeId: PizzaSizeId) =>
  combineSort(
    contramapSort(a => a.prices[sizeId], sortNumber),
    sortByRecommended(sizeId)
  )
