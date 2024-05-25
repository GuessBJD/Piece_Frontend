"use client"

import Link from "next/link"
import useSession from "@/hooks/authHooks/useSession"
import useLogout from "@/hooks/authHooks/useLogout"
import usePiecesRefresh from "@/hooks/piecesHooks/usePiecesRefresh"

export default function NavBar() {
    const { user, isAuthenticated } = useSession()

    const { isLoading: isLoggingOut, logoutOnClickHandler } = useLogout()

    const { piecesRefreshOnClickHandler } = usePiecesRefresh()

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href={"/"} onClick={piecesRefreshOnClickHandler}>
                                <h1 className="text-white text-3xl font-bold">_PIECE.</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center ms-auto">
                        {isAuthenticated ? <h3 className="text-white text-lg font-bold">{isLoggingOut? "Logging out..." : user}</h3> : <></>}
                    </div>
                    <div className="flex items-center ms-3">
                        {
                            isAuthenticated ?
                            <button className="flex-shrink-0 bg-slate-300 hover:bg-slate-400 rounded-xl w-24 text-center" onClick={logoutOnClickHandler} disabled={isLoggingOut}>
                                <p className="text-lg font-bold text-slate-700 hover:text-white p-2">Logout</p>
                            </button> :
                            <Link className="flex-shrink-0 bg-slate-300 hover:bg-slate-400 rounded-xl w-24 text-center" href={"/login"}>
                                <p className="text-lg font-bold text-slate-700 hover:text-white p-2">Login</p>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}