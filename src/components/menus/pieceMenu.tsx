import { MouseEvent, RefObject } from "react"

interface PieceMenuProps {
    menuRef: RefObject<HTMLDivElement>
    isMenuOpen: boolean
    menuOnClickHandler: (event: MouseEvent<HTMLButtonElement>) => void
    openEditorOnClickHandler: (event: MouseEvent<HTMLButtonElement>) => void
    deletePieceOnClickHandler: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function PieceMenu({
    menuRef,
    isMenuOpen,
    menuOnClickHandler,
    openEditorOnClickHandler,
    deletePieceOnClickHandler,
} : PieceMenuProps) {

    return (
        <div ref={menuRef} className="relative">
            <button onClick={menuOnClickHandler} className="static hover:bg-gray-200 text-lg font-black py-2 px-4 rounded">
                . . .
            </button>
            {
                isMenuOpen ?
                    <div className="absolute bg-white rounded-md shadow-xl right-1">
                        <ul className="flex flex-col">
                            <li>
                                <button onClick={openEditorOnClickHandler} className="w-full block rounded hover:bg-gray-200 px-6 py-2 text-lg text-left">Edit</button>
                            </li>
                            <li>
                                <button onClick={deletePieceOnClickHandler} className="w-full block rounded hover:bg-gray-200 px-6 py-2 text-lg text-left">Delete</button>
                            </li>
                        </ul>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}