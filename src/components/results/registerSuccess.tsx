"use client"

import Link from "next/link"

export default function RegisterSuccess() {
    return (
        <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">_PIECE.</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Registration successful!</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    You can now log in to your account.{' '}
                    <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
        </div>
    )
}