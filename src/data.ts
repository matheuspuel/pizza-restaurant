import { Flavor } from './domain/flavor'

export const restaurantName = 'Red Hot Pizza'

export const flavors: Flavor[] = [
  {
    id: 1,
    name: 'Calabresa',
    description: 'Calabresa, cebola',
    price: 39.9,
    spiceLevel: 1,
  },
  {
    id: 2,
    name: 'Palmito',
    description: 'Palmito, tomate',
    price: 39.9,
    vegetarian: true,
  },
  {
    id: 3,
    name: 'Bacon',
    description: 'Bacon',
    price: 39.9,
  },
  {
    id: 4,
    name: 'Portuguesa',
    description: 'Presunto, ovo, pimentão',
    price: 39.9,
  },
  {
    id: 5,
    name: 'Frango',
    description: 'Frango desfiado, catupiry',
    price: 39.9,
  },
  {
    id: 6,
    name: 'Pepperoni',
    description: 'Pepperoni',
    price: 39.9,
    spiceLevel: 2,
  },
  {
    id: 7,
    name: 'Quatro Queijos',
    description: 'Mussarela, parmesão, provolone, gorgonzola',
    price: 39.9,
  },
  {
    id: 8,
    name: 'Mexicana',
    description: 'Calabresa, tomate, pimentão, pimenta',
    price: 39.9,
    spiceLevel: 3,
  },
]
