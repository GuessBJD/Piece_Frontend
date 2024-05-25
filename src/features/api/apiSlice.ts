import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import Cookies from "js-cookie"
import { Mutex } from "async-mutex"
import { TokenInvalidErrorBody } from "../../types"
import { logout } from "../auth/authSlice"

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_HOST}/api`,
    credentials: 'include',
    mode: 'cors',
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        const errorBody = result.error.data as TokenInvalidErrorBody
        if (errorBody && errorBody.code === "token_not_valid") {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire()
                try {
                    const refreshResponse = await baseQuery(
                        {
                            url: "/jwt/refresh/",
                            method: "POST",
                            headers: {
                                'X-CSRFToken': Cookies.get("csrftoken")
                            },
                            credentials: 'include',
                        },
                        api,
                        extraOptions
                    )
                    if (refreshResponse.meta?.response?.status === 201) {
                        // retry original request with refreshed token
                        result = await baseQuery(args, api, extraOptions)
                    } else {
                        result = await baseQuery(
                            {
                                url: "/logout/",
                                method: "POST",
                                headers: {
                                    'X-CSRFToken': Cookies.get("csrftoken")
                                },
                                credentials: 'include',
                            },
                            api,
                            extraOptions
                        )
                        if (result.meta?.response?.status === 201) {
                            api.dispatch(logout())
                        }
                    }
                } finally {
                    release()
                }
            } else {
                // wait for token refresh
                await mutex.waitForUnlock()
                result = await baseQuery(args, api, extraOptions)
            }
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
    }),
    endpoints: (builder) => ({}),
    tagTypes: ["Piece"],
})
