import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useCreatePieceMutation } from "@/features/pieces/piecesApiSlice";
import { text } from "stream/consumers";

export default function usePieceCreate() {
    const [createPiece, { isLoading, isSuccess, isError, error }] = useCreatePieceMutation();
    
    const PIECE_FORM_INITIAL_STATE = {
        text: "",
    }

    const [pieceForm, setPieceForm] = useState(PIECE_FORM_INITIAL_STATE);

    const { text } = pieceForm;

    const [isWriting, setIsWriting] = useState(false)

    const pieceFormOnChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setPieceForm({...pieceForm, [name]: value })
    }
    
    const pieceFormOnSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createPiece(pieceForm)
            setPieceForm(PIECE_FORM_INITIAL_STATE)
            setIsWriting(false)
        } catch (error) {
        }
    }

    useEffect(() => {
        if (text.length > 0) {
            setIsWriting(true)
        } else {
            setIsWriting(false)
        }
    }, [text])

    return {
        text,
        isPosting: isLoading,
        isWriting,
        pieceFormOnChangeHandler,
        pieceFormOnSubmitHandler,
    }
}