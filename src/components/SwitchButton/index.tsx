import type { Switch } from "../../types";

interface SwitchButtonProps {
    id: Switch;
    active: Switch;
    text: string;
    handleClick: (id: Switch) => void;
    icon?: React.ReactNode
}

export const SwitchButton = ({ active, text, handleClick, icon, id }: SwitchButtonProps) => {
    return (
        <button 
            className={`flex items-center text-textSecondary py-2.5 px-3 border border-none rounded-md ${active === id && 'bg-white'}`} 
            onClick={() => handleClick(id)}
        >
            { icon }
            { text }
        </button>
    )
}