import { useState, ChangeEvent, FormEvent} from "react"
import { useRegisterMutation } from "@/features/auth/authApiSlice"
import { isFetchBaseQueryError } from "@/lib/errorTypePredicates"

export default function useRegister() {
    const [register, { isLoading }] = useRegisterMutation()

    const REGISTER_FORM_STATUS_INITIAL_STATE = {
        isRegisterSuccess: false,
        isEmailInvalid: false,
        isPasswordInvalid: false,
        isConfirmPasswordInvalid: false,
    }

    const [registerFormStatus, setRegisterFormStatus] = useState(REGISTER_FORM_STATUS_INITIAL_STATE)

    const { isRegisterSuccess, isEmailInvalid, isPasswordInvalid, isConfirmPasswordInvalid } = registerFormStatus
    
    const REGISTER_FORM_INITIAL_STATE = {
        email: "",
        password: "",
        re_password: "",
    }

    const [registerFormData, setRegisterFormData] = useState(REGISTER_FORM_INITIAL_STATE)

    const { email, password, re_password } = registerFormData

    const registerFormOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setRegisterFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    const registerFormOnSubmitHandler = async (event: FormEvent) => {
        event.preventDefault()
        try {
            await register({ email, password, re_password }).unwrap()
            setRegisterFormData(REGISTER_FORM_INITIAL_STATE)
            setRegisterFormStatus((prevStatus) => ({...prevStatus, isRegisterSuccess: true}))
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorData = "error" in error ? JSON.parse(error.error) : error.data
                console.log(errorData)
                if("email" in errorData){
                    setRegisterFormStatus((prevStatus) => ({...prevStatus, isEmailInvalid: true}))
                }
                if("password" in errorData){
                    setRegisterFormStatus((prevStatus) => ({...prevStatus, isPasswordInvalid: true}))
                }
                if("non_field_errors" in errorData){
                    setRegisterFormStatus((prevStatus) => ({...prevStatus, isConfirmPasswordInvalid: true}))
                }
                else{
                    throw new Error("Something went wrong :(")
                }
            }
        }
    }

    return{
        email,
        password,
        re_password,
        isLoading,
        isRegisterSuccess,
        isEmailInvalid,
        isPasswordInvalid,
        isConfirmPasswordInvalid,
        registerFormOnChangeHandler,
        registerFormOnSubmitHandler,
    }
}