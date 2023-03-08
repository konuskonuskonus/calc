import type { Switch } from "../../../types";

interface ConstructorIconProps {
    active: Switch;
}

export const ConstructorIcon = ({ active }: ConstructorIconProps) => {
    return (
        <svg className='mr-2.5' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={`${active === 'constructor' && 'stroke-sky-600'}`} d="M7.5 13.3333L4.16666 10L7.5 6.66668M12.5 6.66668L15.8333 10L12.5 13.3333" stroke="#4D5562" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}