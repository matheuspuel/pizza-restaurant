export type Flavor = {
  id: number
  name: string
  description: string
  price: number
  spiceLevel?: SpiceLevel
  vegetarian?: boolean
}

export type SpiceLevel = 0 | 1 | 2 | 3
