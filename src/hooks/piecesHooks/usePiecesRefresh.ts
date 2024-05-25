import { MouseEvent } from "react";
import { useAppDispatch } from "../appStateHooks/useAppDispatch";
import { piecesApiSlice } from "@/features/pieces/piecesApiSlice";

export default function usePiecesRefresh() {
    const dispatch = useAppDispatch()
    
    const piecesRefreshOnClickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
        dispatch(piecesApiSlice.util.resetApiState())
    }

    return {
        piecesRefreshOnClickHandler
    }
}