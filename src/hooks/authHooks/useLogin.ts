import { ChangeEvent, FormEvent } from "react"
import { useState } from "react"
import { useLoginMutation } from "@/features/auth/authApiSlice"
import { isFetchBaseQueryError } from "@/lib/errorTypePredicates"

export default function useLogin(){
    const [login, { isLoading }] = useLoginMutation()

    const LOGIN_STATUS_INITIAL_STATE = {
        isLoginSuccess: false,
        isLoginInvalid: false,
    }

    const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS_INITIAL_STATE)

    const { isLoginSuccess, isLoginInvalid } = loginStatus

    const LOGIN_FORM_INITIAL_STATE = {
        email: "",
        password: ""
    }

    const [loginForm, setLoginForm] = useState(LOGIN_FORM_INITIAL_STATE)

    const { email, password } = loginForm

    const loginFormOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setLoginForm( (prevFormData) => ({...prevFormData, [name]: value }) )
    }

    const loginFormOnSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try{
            await login({ email, password }).unwrap()
            setLoginForm( LOGIN_FORM_INITIAL_STATE )
            setLoginStatus( (prevLoginStatus) => ({...prevLoginStatus, isLoginSuccess: true }) )
        }catch(error){
            if(isFetchBaseQueryError(error)){
                const errorData = "error" in error ? JSON.parse(error.error) : error.data
                if(errorData.non_field_errors){
                    setLoginStatus( (prevLoginStatus) => ({...prevLoginStatus, isLoginInvalid: true }) )
                }
            }
        }
    }

    return {
        email,
        password,
        isLoading,
        isLoginSuccess,
        isLoginInvalid,
        loginFormOnChangeHandler,
        loginFormOnSubmitHandler
    }
}