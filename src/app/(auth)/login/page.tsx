"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from "next/link"
import useLogin from '@/hooks/authHooks/useLogin'
import LoginForm from "@/components/forms/loginForm"


export default function Page() {
    const router = useRouter()

    const {
        email,
        password,
        isLoading: isLoggingIn,
        isLoginSuccess,
        isLoginInvalid,
        loginFormOnChangeHandler,
        loginFormOnSubmitHandler,
    } = useLogin()

    useEffect(() => {
        if (isLoginSuccess) {
            router.push('/')
        }
    }, [isLoginSuccess])

    return (
        <main className="flex h-full flex-1 flex-col justify-center mb-auto px-6 pt-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900">
                    _Piece.
                </h1>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm
                    email={email}
                    password={password}
                    isLoading={isLoggingIn}
                    isLoginInvalid={isLoginInvalid}
                    loginFormOnChangeHandler={loginFormOnChangeHandler}
                    loginFormOnSubmitHandler={loginFormOnSubmitHandler}
                />
                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    )
}