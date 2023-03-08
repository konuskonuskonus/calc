import { useAppSelector } from "../../hooks/useAppSelector"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { SwitchButton } from "../SwitchButton"
import { ConstructorIcon } from "../SwitchButton/icons/ConstructorIcon"
import { RuntimeIcon } from "../SwitchButton/icons/RuntimeIcon"
import { resetCalculatorState } from "../../store/calcularorSlice"
import { toggleSwitchType } from "../../store/switchSlice"

import type { Switch as SwitchType } from "../../types"

export const Switch = () => {

    const dispatch = useAppDispatch()

    const switchType = useAppSelector(state => state.switch.value)

    const handleSwitch = (id: SwitchType) => {
        dispatch(toggleSwitchType(id))
        dispatch(resetCalculatorState())
    }

    return (
        <div className="ml-auto flex bg-secondBackground p-1 rounded-md mb-2">
            <SwitchButton
                id="runtime"
                active={switchType} 
                text={'Runtime'} 
                handleClick={handleSwitch}
                icon={<RuntimeIcon active={switchType} />}
            />
            <SwitchButton 
                id="constructor"
                active={switchType} 
                text={'Constructor'} 
                handleClick={handleSwitch}
                icon={<ConstructorIcon active={switchType}/>}
            />
        </div>
    )
}