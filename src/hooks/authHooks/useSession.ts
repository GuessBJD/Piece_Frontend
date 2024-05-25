import Cookies from "js-cookie";
import { useEffect } from "react";
import { login, selectUser, selectIsAuthenticated } from "@/features/auth/authSlice";
import { useAppDispatch } from "../appStateHooks/useAppDispatch";
import { useAppSelector } from "../appStateHooks/useAppSelector";
import { pieceApiSlice } from "@/features/pieces/piecesApiSlice";

export default function useSession() {
    const dispatch = useAppDispatch()
    
    const user = useAppSelector(selectUser)
    const isAuthenticated = useAppSelector(selectIsAuthenticated)

    useEffect(() => {
        if(Cookies.get("user") !== undefined){
            dispatch(login(Cookies.get("user")))
        }
    },[])

    useEffect(() => {
        dispatch(pieceApiSlice.util.invalidateTags([{ type: "Piece" }]))
    }, [user])

    return { user, isAuthenticated }
}
