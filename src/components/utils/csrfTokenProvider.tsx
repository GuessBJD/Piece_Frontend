"use client"

import Cookies from "js-cookie"
import { useCsrfQuery } from "@/features/auth/authApiSlice"
import { isFetchBaseQueryError } from "@/lib/errorTypePredicates"

export default function CsrfTokenProvider() {
    if (Cookies.get("csrftoken") === undefined) {
        const { isLoading, isSuccess, isError, error } = useCsrfQuery()

        if (isLoading) {
        } else if (isSuccess) {
        } else if (isError) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = 'error' in error ? error.error : JSON.stringify(error.data)
                console.error(errorMessage)
            }
        }

    }

    return <></>
}
