import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sizes } from 'src/data'
import { Flavor } from 'src/domain/flavor'
import { PizzaSizeId } from 'src/domain/size'
import { t } from 'src/i18n'
import { AppDispatch, RootState } from '../store'

export type Order = {
  pizzas: Array<PizzaOrder>
  observation: string
}

export type PizzaOrder = {
  sizeId: PizzaSizeId
  flavorIds: Array<Flavor['id']>
  quantity: number
}

const initialState: Order = {
  pizzas: [],
  observation: '',
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
    changePizzaFlavors: (
      s,
      a: PayloadAction<{ itemIndex: number; flavorIds: number[] }>
    ) => ({
      ...s,
      pizzas: s.pizzas.map((p, i) =>
        i === a.payload.itemIndex ? { ...p, flavorIds: a.payload.flavorIds } : p
      ),
    }),
    removePizza: (s, a: PayloadAction<{ itemIndex: number }>) => ({
      ...s,
      pizzas: s.pizzas.filter((p, i) => i !== a.payload.itemIndex),
    }),
    incrementPizza: (s, a: PayloadAction<{ itemIndex: number }>) => ({
      ...s,
      pizzas: s.pizzas.map((p, i) =>
        i === a.payload.itemIndex
          ? { ...p, quantity: Math.min(99, p.quantity + 1) }
          : p
      ),
    }),
    decrementPizza: (s, a: PayloadAction<{ itemIndex: number }>) => ({
      ...s,
      pizzas: s.pizzas
        .map((p, i) =>
          i === a.payload.itemIndex
            ? { ...p, quantity: Math.max(0, p.quantity - 1) }
            : p
        )
        .filter(p => p.quantity > 0),
    }),
    clearOrder: () => initialState,
    setObservation: (s, a: PayloadAction<string>) => ({
      ...s,
      observation: a.payload,
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
export const changePizzaFlavors = orderSlice.actions.changePizzaFlavors
export const removePizza = orderSlice.actions.removePizza
export const incrementPizza = orderSlice.actions.incrementPizza
export const decrementPizza = orderSlice.actions.decrementPizza
export const clearOrder = orderSlice.actions.clearOrder
export const setObservation = orderSlice.actions.setObservation

export const maybeChangePizzaSize =
  (args: { itemIndex: number; sizeId: PizzaSizeId }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const item = getOrder(getState()).pizzas[args.itemIndex]
    const flavorsCount = item?.flavorIds.length ?? 0
    const size = sizes[args.sizeId]
    if (flavorsCount > size.maxFlavors) {
      return { valid: false, error: t('Too_many_flavors_for_size') }
    } else {
      dispatch(changePizzaSize(args))
      return { valid: true }
    }
  }
