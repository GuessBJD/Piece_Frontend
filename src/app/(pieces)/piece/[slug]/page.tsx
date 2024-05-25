"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { RetriveUpdateDeletePieceRequestParams } from "@/types"
import usePiece from "@/hooks/piecesHooks/usePiece"
import useMenuToggle from "@/hooks/utilsHooks/useMenuToggle"
import useEditModeToggle from "@/hooks/utilsHooks/useEditModeToggle"
import { usePiecesSuggestion } from "@/hooks/piecesHooks/usePiecesSuggestion"
import PieceMenu from "@/components/menus/pieceMenu"
import PieceEditForm from "@/components/forms/pieceEditForm"
import PieceCard from "@/components/cards/pieceCard"

export default function Page({ params }: { params: RetriveUpdateDeletePieceRequestParams }) {
    const router = useRouter()

    const {
        text,
        user,
        created_at,
        has_update_perms,
        has_delete_perms,
        editText,
        isLoading,
        isSuccess,
        isEdited,
        isUpdating,
        isUpdated,
        isDeleting,
        isDeleted,
        editFormOnChangeHandler,
        editFormOnSubmitHandler,
        undoEditForm,
        deletePieceOnClickHandler,
    } = usePiece(params)

    const {
        menuRef,
        isMenuOpen,
        menuOnClickHandler,
        closeMenu,
    } = useMenuToggle()

    const {
        isEditing,
        openEditorOnClickHandler,
        closeEditorOnClickHandler,
        exitEditor,
    } = useEditModeToggle(undoEditForm, closeMenu)

    const {
        pieces,
        isLoading: isSuggestionsLoading,
        isSuccess: isSuggestionsSuccess,
        refreashSuggestion,
    } = usePiecesSuggestion()

    useEffect(() => {
        if (isUpdated) {
            exitEditor()
        }
    }, [isUpdated])

    useEffect(() => {
        if (isDeleted) {
            router.push('/')
        }
    }, [isDeleted])

    useEffect(() => {
        if (!isUpdated) {
            refreashSuggestion()
        }
    }, [text])

    return (
        <main className="container mx-auto max-h-full flex flex-1 flex-row justify-center px-6 py-12 lg:px-8">
            <div className="basis-1/2">
                <div className='border-b-2 border-b-black pb-3'>
                    {
                        isLoading ?
                            "Loading..."
                            :
                            <>
                                <div className="flex flex-row">
                                    <div className="">
                                        <h2 className="text-2xl font-bold text-gray-900">{user}</h2>
                                        <h3 className="mt-3">
                                            {created_at.toLocaleDateString('en-UK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                        </h3>
                                    </div>
                                    {
                                        has_update_perms && has_delete_perms ?
                                            <div className="ms-auto flex items-center">
                                                {
                                                    (isEditing || isDeleting) ?
                                                        <div className="py-2 px-1">{isDeleting ? "Deleting..." : "Edit Piece"}</div>
                                                        :
                                                        <PieceMenu
                                                            menuRef={menuRef}
                                                            isMenuOpen={isMenuOpen}
                                                            menuOnClickHandler={menuOnClickHandler}
                                                            openEditorOnClickHandler={openEditorOnClickHandler}
                                                            deletePieceOnClickHandler={deletePieceOnClickHandler}
                                                        />
                                                }
                                            </div>
                                            :
                                            <></>
                                    }
                                </div>
                                {
                                    isEditing ?
                                        <div>
                                            <PieceEditForm
                                                editText={editText}
                                                isEdited={isEdited}
                                                isUpdating={isUpdating}
                                                editFormOnChangeHandler={editFormOnChangeHandler}
                                                editFormOnSubmitHandler={editFormOnSubmitHandler}
                                                closeEditorOnClickHandler={closeEditorOnClickHandler}
                                            />
                                        </div>
                                        :
                                        <div>
                                            <h1 className="mt-3 text-3xl font-bold text-gray-900">{text}</h1>
                                        </div>
                                }
                            </>
                    }
                </div>
                <div className="basis-1/3 mt-3">
                    <h1>You may also like:</h1>
                    <div className="mt-3 flex flex-col">
                        {
                            isSuggestionsSuccess ?
                                pieces.map((piece) => (
                                    <PieceCard key={piece.slug} piece={piece} />
                                ))
                                :
                                "Loading..."
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}