'use client'

interface EyeButtonProps {
    open: boolean;
    onClick: () => void;
}

export const EyeButton = ({ open, onClick }: EyeButtonProps) => {
    return (
        <button title={`${!open ? "Mostrar" : "Ocultar"} contraseña`}
            className="flex items-center justify-center h-full focus:outline-none"
            type="button"
            onClick={onClick}
        >
            {open ? <span className="icon-[mingcute--eye-2-line] pointer-events-none size-6"></span> :
                <span className="icon-[mingcute--eye-close-line] pointer-events-none size-6"></span>}
        </button>
    )
}