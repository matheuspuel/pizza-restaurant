import { Flavor } from './domain/flavor'
import { PizzaSizeId, PizzaSizeInfo } from './domain/size'

export const restaurantName = 'Red Hot Pizza'

export const sizes: Record<PizzaSizeId, PizzaSizeInfo> = {
  sm: { id: 'sm', name: 'Small', slices: 6, centimeters: 30 },
  md: { id: 'md', name: 'Medium', slices: 8, centimeters: 40 },
  lg: { id: 'lg', name: 'Large', slices: 10, centimeters: 50 },
  xl: { id: 'xl', name: 'Extra-Large', slices: 12, centimeters: 60 },
  xxl: { id: 'xxl', name: 'Giant', slices: 16, centimeters: 70 },
}

export const flavors: Flavor[] = [
  {
    id: 1,
    name: 'Calabresa',
    description: 'Calabresa, cebola',
    prices: { sm: 29.9, md: 44.9, lg: 59.9, xl: 74.9, xxl: 89.9 },
    spiceLevel: 1,
  },
  {
    id: 2,
    name: 'Palmito',
    description: 'Palmito, tomate',
    prices: { sm: 29.9, md: 44.9, lg: 59.9, xl: 74.9, xxl: 89.9 },
    vegetarian: true,
  },
  {
    id: 3,
    name: 'Bacon',
    description: 'Bacon',
    prices: { sm: 29.9, md: 44.9, lg: 59.9, xl: 74.9, xxl: 89.9 },
  },
  {
    id: 4,
    name: 'Portuguesa',
    description: 'Presunto, ovo, pimentão',
    prices: { sm: 29.9, md: 44.9, lg: 59.9, xl: 74.9, xxl: 89.9 },
  },
  {
    id: 5,
    name: 'Frango',
    description: 'Frango desfiado, catupiry',
    prices: { sm: 29.9, md: 44.9, lg: 59.9, xl: 74.9, xxl: 89.9 },
  },
  {
    id: 6,
    name: 'Pepperoni',
    description: 'Pepperoni',
    prices: { sm: 29.9, md: 44.9, lg: 59.9, xl: 74.9, xxl: 89.9 },
    spiceLevel: 2,
  },
  {
    id: 7,
    name: 'Quatro Queijos',
    description: 'Mussarela, parmesão, provolone, gorgonzola',
    prices: { sm: 29.9, md: 44.9, lg: 59.9, xl: 74.9, xxl: 89.9 },
  },
  {
    id: 8,
    name: 'Mexicana',
    description: 'Calabresa, tomate, pimentão, pimenta',
    prices: { sm: 34.9, md: 49.9, lg: 64.9, xl: 79.9, xxl: 94.9 },
    spiceLevel: 3,
  },
]
