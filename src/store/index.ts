import { configureStore } from '@reduxjs/toolkit'
import calcularorSlice from './calcularorSlice'
import switchSlice from './switchSlice'

export const store = configureStore({
  reducer: {
    calculator: calcularorSlice,
    switch: switchSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch