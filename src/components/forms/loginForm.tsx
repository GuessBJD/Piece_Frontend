import { ChangeEvent, FormEvent } from 'react'

interface LoginFormProps {
    email: string,
    password: string,
    isLoading: boolean,
    isLoginInvalid: boolean,
    loginFormOnChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    loginFormOnSubmitHandler: (event: FormEvent<HTMLFormElement>) => void,
}

export default function LoginForm({
    email,
    password,
    isLoading,
    isLoginInvalid,
    loginFormOnChangeHandler,
    loginFormOnSubmitHandler,
}: LoginFormProps) {
    return (
        <form className="space-y-6" onSubmit={loginFormOnSubmitHandler}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={loginFormOnChangeHandler}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="off"
                        required
                        value={password}
                        onChange={loginFormOnChangeHandler}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div>
                {isLoginInvalid? <p className="block text-sm font-semibold text-red-500">*Invalid email or password.</p> : null}
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
            </div>
        </form>
    )
}