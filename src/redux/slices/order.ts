import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sizes } from 'src/data'
import { Flavor } from 'src/domain/flavor'
import { PizzaSizeId } from 'src/domain/size'
import { AppDispatch, RootState } from '../store'

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
    changePizzaSize: (
      s,
      a: PayloadAction<{ itemIndex: number; sizeId: PizzaSizeId }>
    ) => ({
      ...s,
      pizzas: s.pizzas.map((p, i) =>
        i === a.payload.itemIndex ? { ...p, sizeId: a.payload.sizeId } : p
      ),
    }),
  },
})

export default orderSlice.reducer

// SELECTORS

export const getOrder = (state: RootState) => state.order

// ACTIONS

export const setOrder = orderSlice.actions.set
export const addPizza = orderSlice.actions.addPizza
export const changePizzaSize = orderSlice.actions.changePizzaSize

export const maybeChangePizzaSize =
  (args: { itemIndex: number; sizeId: PizzaSizeId }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const item = getOrder(getState()).pizzas[args.itemIndex]
    const flavorsCount = item?.flavorIds.length ?? 0
    const size = sizes[args.sizeId]
    if (flavorsCount > size.maxFlavors) {
      return { valid: false, error: 'Too many flavors for this pizza size' }
    } else {
      dispatch(changePizzaSize(args))
      return { valid: true }
    }
  }
