import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CalculatorActions } from '../components/CalculatorPiece'

import { ICalculatorPiece } from '../types'
import type { RootState } from '.'

interface CalculatorState {
  value: string,
  currentOperation: {
    memoValue?: number,
    operation: CalculatorActions | null,
  }
  blocks: ICalculatorPiece[]
  mainBlocks: ICalculatorPiece[]
}

const initialState: CalculatorState = {
  value: '0',
  currentOperation: {
    memoValue: undefined,
    operation: null,
  },
  blocks: [
    {
        id: '1',
        title: 'display',
        placed: 'constructor',
    },
    {
        id: '2',
        title: 'actions',
        placed: 'constructor',
    },
    {
        id: '3',
        title: 'numbers',
        placed: 'constructor',
    },
    {
        id: '4',
        title: 'equal',
        placed: 'constructor',
    },
],
  mainBlocks: []
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    changeValue: (state, { payload }: PayloadAction<string>) => {
      state.value = state.value === '0'? state.value = payload : state.value += payload
    },
    increment: (state) => {
      state.currentOperation.memoValue = +state.value
     
      state.currentOperation.operation = '+'
      state.value = '0'
    },
    decrement: (state) => {
      state.currentOperation.memoValue = +state.value
      
      state.currentOperation.operation = "-"
      state.value = '0'
    },
    divide: (state) => {
      state.currentOperation.memoValue = +state.value
      
      state.currentOperation.operation = '/'
      state.value = '0'
    },
    multiply: (state) => {
      state.currentOperation.memoValue = +state.value
     
      state.currentOperation.operation = 'X'
      state.value = '0'
    },
    makeResult:(state) => {
      const currentOperation = state.currentOperation.operation
      switch (currentOperation) {
        case "+":
          if (state.currentOperation.memoValue) {
              state.value = String(state.currentOperation.memoValue + +state.value)
              if (state.value.includes('.')) {
                state.value = String(Number(state.value).toFixed(6))
              }

              state.currentOperation.memoValue = 0
              state.currentOperation.operation = null
          }
          break
        case "-":
          if (state.currentOperation.memoValue) {
              state.value = String(state.currentOperation.memoValue - +state.value)
              if (state.value.includes('.')) {
                state.value = String(Number(state.value).toFixed(6))
              }

              state.currentOperation.memoValue = 0
              state.currentOperation.operation = null
          }
          break
        case "/":
          if (state.currentOperation.memoValue) {
              if (state.value === '0') {
                state.value = 'Не определено'
                return
              }

              state.value = String(state.currentOperation.memoValue / +state.value)
              if (state.value.includes('.')) {
                state.value = String(Number(state.value).toFixed(6))
              }

              state.currentOperation.memoValue = 0
              state.currentOperation.operation = null
          }
          break
        case "X":
          if (state.currentOperation.memoValue) {
              state.value = String(state.currentOperation.memoValue * +state.value)
              if (state.value.includes('.')) {
                state.value = String(Number(state.value).toFixed(6))
              }

              state.currentOperation.memoValue = 0
              state.currentOperation.operation = null
          }
          break
      }
    },
    addBlockToMainContainer: (state, { payload: id }: PayloadAction<string>) => {
        const block = state.blocks.find(block => block.id === id)

        if (block) {
            block.placed === 'main'? block.placed = 'constructor' : block.placed = 'main'
            state.mainBlocks.push(block)

            const displayBlock = state.mainBlocks.find(block => block.title === "display")
            if (displayBlock) {
              const displayBlockIndex = state.mainBlocks.indexOf(displayBlock)
              state.mainBlocks.unshift(state.mainBlocks.splice(displayBlockIndex, 1)[0])
            }
        }
    },
    removeBlockFromMainContainer: (state, { payload: id }: PayloadAction<string>) => {
        const block = state.blocks.find(block => block.id === id)

        if (block) {
          block.placed = 'constructor'
          state.mainBlocks = state.mainBlocks.filter(block => block.id !== id)
      }
    },
    resetCalculatorState: (state) => {
      state.value = '0';
    }
  },
})

export const { 
  increment, 
  decrement,
  multiply, 
  divide, 
  addBlockToMainContainer, 
  removeBlockFromMainContainer, 
  changeValue,
  makeResult,
  resetCalculatorState
} = calculatorSlice.actions

export const valueCount = (state: RootState) => state.calculator.value

export default calculatorSlice.reducer