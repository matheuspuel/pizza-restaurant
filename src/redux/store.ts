import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authentication from './slices/authentication'
import connection from './slices/connection'
import order from './slices/order'

const rootReducer = combineReducers({
  connection,
  order,
  authentication,
})

const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({ serializableCheck: false }),
  // preloadedState: __DEV__ ? getCache() : undefined,
})
// if (__DEV__) store.subscribe(() => setCache(store.getState()))
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
