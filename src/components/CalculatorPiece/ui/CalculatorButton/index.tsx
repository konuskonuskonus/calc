import { changeValue, decrement, divide, increment, multiply } from "../../../../store/calcularorSlice"
import { useAppDispatch } from "../../../../hooks/useAppDispatch"

import type { Switch } from "../../../../types"
import type { CalculatorActions, CalculatorNumbers } from "../.."

type ContentType = CalculatorActions | CalculatorNumbers

interface CalculatorButtonProps {
    content: ContentType
    contentType: 'actions' | 'numbers',
    switchType: Switch
}

export const CalculatorButton = ({ content, contentType, switchType }: CalculatorButtonProps) => {

    const dispatch = useAppDispatch()

    const handleClick = () => {
        if (switchType === 'constructor') return

        if (contentType === 'numbers') {
            dispatch(changeValue(content))
        }

        switch (content) {
            case '+':
                return dispatch(increment())
            case '-':
                return dispatch(decrement())
            case '/':
                return dispatch(divide())
            case 'X':
                return dispatch(multiply())
        }

    }

    return (
        <button className={`h-12 flex justify-center items-center
            border border-secondary rounded mr-2.5
            text-black font-medium
            hover:border hover:border-darkblue
            active:bg-darkblue active:text-white
            ${contentType === 'actions' && 'flex-1 last:mr-0'} 
            ${content === '0' && 'w-[calc(66%_-_8px)]'}
            ${contentType === 'numbers' && 'w-[calc(33%_-_9px)] mb-3 last:flex-1 last:mr-0 nth-5:flex-1 nth-5:mr-0  nth-8:flex-1 nth-8:mr-0 nth-2:flex-1 nth-2:mr-0'}
        `}
            onClick={() => handleClick()}
        >
            <span>{ content }</span>
        </button>
    )
}