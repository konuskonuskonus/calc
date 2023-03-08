import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from "../../hooks/useAppSelector"
import { CalculatorPiece } from "../CalculatorPiece"
import { removeBlockFromMainContainer } from '../../store/calcularorSlice'

import type { DropdownContainerType, ICalculatorPiece } from "../../types"

interface DropdownContainerProps {
    containerType: DropdownContainerType
    blocks: ICalculatorPiece[]
    isDragging: boolean
    handleDrag: (value: boolean) => void
    updateBlocksState: (id: string, type: DropdownContainerType) => void
}

export const DropdownContainer = ({ 
    containerType,
    blocks,
    isDragging,
    handleDrag,
    updateBlocksState,
}: DropdownContainerProps) => {

    const dispatch = useAppDispatch()
    const mainBlocks = useAppSelector(state => state.calculator.mainBlocks)
    const switchType = useAppSelector(state => state.switch.value)
    

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (containerType === 'constructor') return
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (containerType === 'constructor') return
        
        e.preventDefault()
        const id = e.dataTransfer.getData('text')
        updateBlocksState(id, containerType)
        handleDrag(false)
    }

    const removeBlockFromMain = (id: string) => {
        dispatch(removeBlockFromMainContainer(id))
    }


    const renderDropdownContainer = (type: DropdownContainerType) => {
        switch (type) {
            case "constructor":
                return switchType === 'constructor'?
                    <div className='w-full h-full'>
                        {
                                blocks.map(block =>
                                <div key={block.id} className={`${block.placed === 'main' && 'opacity-50'}`}>
                                    <CalculatorPiece 
                                        id={block.id}
                                        placed={block.placed}
                                        type={block.title} 
                                        handleDrag={handleDrag}
                                    />
                                </div>
                                )
                        }
                    </div>
                    :
                    null
            case "main":
                return mainBlocks.length > 0? 
                <div className="">
                    {
                        mainBlocks.map(block => {
                            return (
                            <CalculatorPiece 
                                type={block.title}
                                id={block.id}
                                placed={block.placed}
                                key={block.id}
                                handleDrag={handleDrag}
                                removeBlock={removeBlockFromMain}
                            />
                            )
                        })
                    }
                </div>
                :
                <div className={`${isDragging && 'bg-hoverColor'} w-full h-full flex flex-col justify-center items-center border-2 border-dashed`}>
                    <img className="mb-3" src="./images/draganddrop.svg" alt="drag and drop pic"/>
                    <h1 className="text-darkblue mb-1">Перетащите сюда</h1>
                    <span className="text-xs text-center text-textSecondary w-28">любой элемент из левой панели</span>
                </div>
        }
    }

    return (
        <div 
            className="w-1/2 h-full mr-10 last:mr-0"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {
               renderDropdownContainer(containerType)
            }
        </div>
    )
}