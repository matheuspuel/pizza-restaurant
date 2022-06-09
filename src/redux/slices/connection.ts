import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const isInternetReachableSlice = createSlice({
  name: 'isInternetReachable',
  initialState: false,
  reducers: {
    set: (_s, a: PayloadAction<boolean>) => a.payload,
  },
})

const isServerReachableSlice = createSlice({
  name: 'isServerReachable',
  initialState: false,
  reducers: {
    set: (_s, a: PayloadAction<boolean>) => a.payload,
  },
})

export default combineReducers({
  isInternetReachable: isInternetReachableSlice.reducer,
  isServerReachable: isServerReachableSlice.reducer,
})

// SELECTORS

const getConnectionSlice = (state: RootState) => state.connection
export const getIsInternetReachable = (state: RootState) =>
  getConnectionSlice(state).isInternetReachable
export const getIsServerReachable = (state: RootState) =>
  getConnectionSlice(state).isServerReachable

// ACTIONS

export const setIsInternetReachable = isInternetReachableSlice.actions.set
export const setIsServerReachable = isServerReachableSlice.actions.set
