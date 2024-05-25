import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from "react";
import { useGetPieceQuery, useUpdatePieceMutation, useDeletePieceMutation } from "@/features/pieces/piecesApiSlice";
import { RetriveUpdateDeletePieceRequestParams } from "@/types";

export default function usePiece(params: RetriveUpdateDeletePieceRequestParams) {
    const { data, isLoading, isSuccess, isError, error } = useGetPieceQuery(params)

    const [updatePiece, { isLoading: isUpdating, isSuccess: isUpdated }] = useUpdatePieceMutation()

    const [deletePiece, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeletePieceMutation()

    const [editForm, setEditForm] = useState({ text: "" })

    const [isEdited, setIsEdited] = useState(false)

    useEffect(() => {
        if (data) {
            setEditForm({ text: data.result.text })
            if (isUpdated){
                setIsEdited(false)
            }
        }
    }, [data, isUpdated])

    const editFormOnChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target
        if (value.length <= 200) {
            setEditForm((prev) => ({ ...prev, [name]: value }))
        }
    }

    useEffect(() => {
        if (String(editForm.text) === String(data?.result.text ?? "")) {
            setIsEdited(false)
        } else {
            setIsEdited(true)
        }
    }, [editForm])

    const editFormOnSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isEdited) {
            try {
                await updatePiece({ slug: params.slug, text: editForm.text })
            } catch (error) {
            }
        }
    }

    function undoEditForm() {
        if (data) {
            setEditForm({ text: data.result.text })
        }
        setIsEdited(false)
    }

    const deletePieceOnClickHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        try{
            await deletePiece({ slug: params.slug })
        }catch(error){
        }
    }

    return {
        text: data?.result.text,
        user: data?.result.user,
        created_at: new Date(data?.result.created_at ?? ""),
        has_update_perms: data?.perms.update,
        has_delete_perms: data?.perms.delete,
        editText: editForm.text,
        isLoading,
        isSuccess,
        isEdited,
        isUpdating,
        isUpdated,
        isDeleted,
        isDeleting,
        editFormOnChangeHandler,
        editFormOnSubmitHandler,
        undoEditForm,
        deletePieceOnClickHandler,
    }
}