import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { Switch } from '../types'

interface SwitchState {
  value: Switch,
}

const initialState: SwitchState = {
  value: 'constructor',
}

export const switchSlice = createSlice({
  name: 'switch',
  initialState,
  reducers: {
    toggleSwitchType: (state, { payload: id }: PayloadAction<Switch>) => {
        state.value = id
    }
  },
})

export const { toggleSwitchType } = switchSlice.actions

export default switchSlice.reducer