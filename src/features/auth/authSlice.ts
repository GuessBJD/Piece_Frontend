import Cookies from "js-cookie"
import { createSlice } from "@reduxjs/toolkit"
import { AuthState } from "@/types"
import { RootState } from "@/app/store"

const initialState: AuthState = {
    user: "",
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = ""
            state.isAuthenticated = false
        },
    },
})

export const { login, logout } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated

export default authSlice.reducer