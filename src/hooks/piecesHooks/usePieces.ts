import { useEffect, useRef, useCallback } from "react"
import { piecesApiSlice, useLazyGetPiecesQuery, piecesAdapter, piecesSelector } from "@/features/pieces/piecesApiSlice"
import { store } from "@/app/store"

export default function usePieces() {
    const lastElementObserverRef = useRef<IntersectionObserver>()

    const [trigger, { data, isUninitialized, isLoading, isFetching, isSuccess, isError, error }] = useLazyGetPiecesQuery(
        {
            selectFromResult: ({ data, ...otherParams }) => ({
                data: {
                    page: data?.page,
                    results: piecesSelector.selectAll(data?.results ?? piecesAdapter.getInitialState())
                },
                ...otherParams,
            })
        }
    )

    useEffect(() => {
        // Retrieve last cached args
        const cachedArgs = piecesApiSlice.util.selectCachedArgsForQuery(store.getState(), "getPieces")

        if (isUninitialized && cachedArgs.length === 0) {
            // If no cached args, trigger initial fetch
            trigger({ page: 1 })
        } else {
            // If last cached args exist, trigger fetch with cached args to retrive last state
            trigger({ page: cachedArgs[0].page })
        }
    }, [isUninitialized])

    const lastElementObserverCallback  = useCallback((node: HTMLDivElement) => {
        if (isSuccess) {
            // disconnect previous observer
            if (lastElementObserverRef.current) lastElementObserverRef.current.disconnect()

            // create new observer
            lastElementObserverRef.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && data.page?.next_page) {
                    trigger({ page: data.page?.next_page })
                }
            })

            // observe last element
            if (node) lastElementObserverRef.current.observe(node)
        }
    }, [data.page])

    useEffect(() => {
        if (isError) {
            throw new Error("Something went wrong :(")
        }
    }, [isError])

    return {
        pieces: data?.results,
        isLoading,
        isFetching,
        isSuccess,
        lastElementObserverCallback ,
    }
}
