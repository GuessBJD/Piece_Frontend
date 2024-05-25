"use client"
import Link from "next/link"
import { useState } from "react"
import useRegister from "@/hooks/authHooks/useRegister"
import RegisterForm from "@/components/forms/registerForm"
import RegisterSuccess from "@/components/results/registerSuccess"
import { useEffect } from "react"

export default function Page() {
    const {
        email,
        password,
        re_password,
        isLoading: isRegisterLoading,
        isRegisterSuccess,
        isEmailInvalid,
        isPasswordInvalid,
        isConfirmPasswordInvalid,
        registerFormOnChangeHandler,
        registerFormOnSubmitHandler,
    } = useRegister()

    return (
        <main className="flex max-h-full flex-1 flex-col justify-center px-6 pt-12">
            {
                isRegisterSuccess ?
                    <RegisterSuccess />
                    :
                    <>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h1 className="mt-10 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900">
                                _Piece.
                            </h1>
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Register
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <RegisterForm
                                email={email}
                                password={password}
                                re_password={re_password}
                                isLoading={isRegisterLoading}
                                isEmailInvalid={isEmailInvalid}
                                isPasswordInvalid={isPasswordInvalid}
                                isConfirmPasswordInvalid={isConfirmPasswordInvalid}
                                registerFormOnChangeHandler={registerFormOnChangeHandler}
                                registerFormOnSubmitHandler={registerFormOnSubmitHandler}
                            />
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already have an account?{' '}
                                <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </>
            }
        </main>
    )
}