import { useState, MouseEvent } from "react"

export default function useEditModeToggle(undoForm: () => void, closeMenu: () => void) {
    const [isEditing, setIsEditing] = useState(false)

    const openEditorOnClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        closeMenu()
        setIsEditing(true)
    }

    const closeEditorOnClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        undoForm()
        setIsEditing(false)
    }

    function exitEditor(){
        setIsEditing(false)
    }

    return{
        isEditing,
        openEditorOnClickHandler,
        closeEditorOnClickHandler,
        exitEditor,
    }
}