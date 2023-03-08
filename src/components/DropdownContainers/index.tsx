import { useState } from "react"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { addBlockToMainContainer } from "../../store/calcularorSlice"
import { DropdownContainer } from "../DropdownContainer"

import type { DropdownContainerType } from "../../types"

const typesDropdownContainers = ['constructor', 'main' ] as DropdownContainerType[]

export const DropdownContainers = () => {

    const dispatch = useAppDispatch()

    const [isDragging, setIsDragging] = useState<boolean>(false)
    const blocks = useAppSelector(state => state.calculator.blocks)

    const handleDragging = (dragging: boolean) => {
        setIsDragging(dragging)
    }

    const updateBlocksState = (id: string, containerType: DropdownContainerType) => {
        let block = blocks.find(item => item.id === id)

        if (block && block.placed !== containerType) {
            dispatch(addBlockToMainContainer(block.id))
        }
    }

    return (
        <div className="flex w-full h-full">
            {
                typesDropdownContainers.map(container => {
                    return (
                        <DropdownContainer
                            key={container}
                            containerType={container}
                            blocks={blocks}
                            isDragging={isDragging}
                            handleDrag={handleDragging}
                            updateBlocksState={updateBlocksState}
                        />
                    )
                })
            }
        </div>
    )
}