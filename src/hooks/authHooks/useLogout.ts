import { MouseEvent } from "react"
import { useLogoutMutation } from "@/features/auth/authApiSlice"

export default function useLogout() {
    const [logout, { isLoading }] = useLogoutMutation()

    const logoutOnClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        try{
            logout()
        } catch (error) {
        }
    }

    return {
        isLoading,
        logoutOnClickHandler,
    }
}