import { ChangeEvent, FormEvent } from 'react'

interface registerFormProps {
    email: string,
    password: string,
    re_password: string,
    isLoading: boolean,
    isEmailInvalid: boolean,
    isPasswordInvalid: boolean,
    isConfirmPasswordInvalid: boolean,
    registerFormOnChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    registerFormOnSubmitHandler: (event: FormEvent<HTMLFormElement>) => void,
}

export default function RegisterForm(
    {
        email,
        password,
        re_password,
        isLoading,
        isEmailInvalid,
        isPasswordInvalid,
        isConfirmPasswordInvalid,
        registerFormOnChangeHandler,
        registerFormOnSubmitHandler,
    }: registerFormProps
) {
    return (
        <form className="space-y-6" onSubmit={registerFormOnSubmitHandler}>
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
                        onChange={registerFormOnChangeHandler}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={isLoading}
                    />
                    {isEmailInvalid ? <p className="mt-1 text-xs font-semibold text-red-500">*A user with that email already exists.</p> : null}
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
                        onChange={registerFormOnChangeHandler}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={isLoading}
                    />
                    {
                        isPasswordInvalid ?
                        <ul className="mt-1 text-xs font-semibold text-red-500">
                            <li>*Password must be at least 8 characters long.</li>
                            <li>*Password must not be entirely numeric.</li>
                            <li>*Password must not be a commonly used password.</li>
                        </ul>
                        : null
                    }
                </div>
            </div>

            <div>
                <label htmlFor="re_password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                </label>
                <div className="mt-2">
                    <input
                        id="re_password"
                        name="re_password"
                        type="password"
                        autoComplete="off"
                        required
                        value={re_password}
                        onChange={registerFormOnChangeHandler}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={isLoading}
                    />
                </div>
                {isConfirmPasswordInvalid ? <p className="mt-1 text-xs font-semibold text-red-500">*The two passwords didn't match.</p> : null}
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Register'}
                </button>
            </div>
        </form>
    )
}