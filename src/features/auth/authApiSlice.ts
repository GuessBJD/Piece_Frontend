import Cookies from "js-cookie"
import { apiSlice } from "../api/apiSlice"
import { login, logout } from "./authSlice"
import { LoginRequestBody, RegisterRequestBody } from "../../types"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        csrf: builder.query<void, void>({
            query: () => "/csrf/",
        }),
        login: builder.mutation<any, LoginRequestBody>({
            query: (body) => ({
                url: "/login/",
                method: "POST",
                headers: {
                    'X-CSRFToken': Cookies.get("csrftoken")
                },
                body: body,
                credentials: "include",
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    // Dispatch an action when the query successfully completes
                    if (data && "user" in data){
                        dispatch(login(data.user))
                    }
                    else{
                    }
                } catch (error) {
                    // Handle error if needed
                }
            }
        }),
        register: builder.mutation<any, RegisterRequestBody>({
            query: (body) => ({
                url: "/users/",
                method: "POST",
                headers: {
                    'Cookie': `csrftoken=${Cookies.get("csrftoken")}`,
                    'X-CSRFToken': Cookies.get("csrftoken")
                },
                body: body,
                credentials: "include",
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/logout/",
                method: "POST",
                headers: {
                    'X-CSRFToken': Cookies.get("csrftoken")
                },
                credentials: "include",
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(logout())
                } catch (error) {
                    // Handle error if needed
                }
            }
        }),
    }),
    overrideExisting: true,
})

export const {
    useCsrfQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation
} = authApiSlice
