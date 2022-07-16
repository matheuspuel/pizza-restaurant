import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Flavor } from 'src/domain/flavor'
import { PizzaSizeId } from 'src/domain/size'
import { RootState } from '../store'

export type Order = {
  pizzas: Array<PizzaOrder>
}

export type PizzaOrder = {
  sizeId: PizzaSizeId
  flavorIds: Array<Flavor['id']>
}

const initialState: Order = {
  pizzas: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    set: (s, a: PayloadAction<Order>) => a.payload,
    addPizza: (s, a: PayloadAction<PizzaOrder>) => ({
      ...s,
      pizzas: [...s.pizzas, a.payload],
    }),
  },
})

export default orderSlice.reducer

// SELECTORS

export const getOrder = (state: RootState) => state.order

// ACTIONS

export const setOrder = orderSlice.actions.set
export const addPizza = orderSlice.actions.addPizza
