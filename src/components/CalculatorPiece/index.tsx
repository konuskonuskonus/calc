import { useAppDispatch } from '../../hooks/useAppDispatch'
import { CalculatorButton } from "./ui/CalculatorButton"
import { makeResult } from '../../store/calcularorSlice'
import { useAppSelector } from "../../hooks/useAppSelector"

import type { CalculatorPieceType, DropdownContainerType } from "../../types"

interface CalculatorPieceProps {
    type: CalculatorPieceType
    id: string
    handleDrag: (value: boolean) => void
    placed: DropdownContainerType
    removeBlock?: (id: string) => void
}

export type CalculatorActions = '/' | 'X' | '+' | '-'
const actionTypes: CalculatorActions[] = ['/', 'X', '+', '-']

export type CalculatorNumbers = ',' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
const numberTypes: CalculatorNumbers[] = ['0', ',','1','2','3','4','5','6','7','8','9']

export const CalculatorPiece = ({
    type,
    handleDrag,
    placed,
    id,
    removeBlock,
}: CalculatorPieceProps) => {

    const dispatch = useAppDispatch()

    const valueCalculator = useAppSelector(state => state.calculator.value)
    const switchType = useAppSelector(state => state.switch.value)

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', `${id}`)
        handleDrag(true)
    }

    const handleDragEnd = () => {
        handleDrag(false)
    }

    const remove = () => {
        removeBlock?.(id)
    }

    const makeResultOperation = () => {
        if (switchType === 'constructor') return
        dispatch(makeResult())
    }

    const renderContent = (type: CalculatorPieceType) => {
        switch(type) {
            case "display":
                return (
                    <div className={`${ placed === 'main' && 'pointer-events-none'} bg-secondBackground py-2 px-3 ml-auto rounded flex justify-end`}>
                        <span className="text-4xl text-gray-900">{ valueCalculator }</span>
                    </div>
                )
            case "actions":
                return (
                    <div className="flex">
                        {
                            actionTypes.map(action => {
                                return (
                                    <CalculatorButton 
                                        key={action} 
                                        content={action}
                                        switchType={switchType}
                                        contentType="actions"
                                    />
                                )
                            })
                        }
                    </div>
                )
            case "numbers":
                return (
                    <div className="flex flex-wrap-reverse mb-auto">
                        {
                            numberTypes.map(el => {
                                return (
                                    <CalculatorButton 
                                        key={el}
                                        switchType={switchType}
                                        content={el} 
                                        contentType="numbers"
                                    />
                                )
                            })
                        }
                    </div>
                )
            case "equal":
                return (
                    <button 
                        className="w-full flex items-center justify-center bg-darkblue rounded h-16 text-white"
                        onClick={() => makeResultOperation()}
                    >
                        =
                    </button>
                )
        }
    }

    return (
        <div
            className={`w-full p-1 shadow-md rounded mb-3`}
            draggable
            onDoubleClick={remove}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            { renderContent(type) }
        </div>
    )
}