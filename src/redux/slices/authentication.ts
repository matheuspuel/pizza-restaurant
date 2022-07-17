import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AuthenticationState = {
  authenticated: boolean
}

const initialState: AuthenticationState = {
  authenticated: false,
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    set: (s, a: PayloadAction<AuthenticationState>) => a.payload,
  },
})

export default authenticationSlice.reducer

// SELECTORS

export const getAuthentication = (state: RootState) => state.authentication

// ACTIONS

export const setAuthentication = authenticationSlice.actions.set
