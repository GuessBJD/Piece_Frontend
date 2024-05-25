import { useGetPiecesRandomQuery, piecesSelector, piecesAdapter } from "@/features/pieces/piecesApiSlice";

export function usePiecesSuggestion() {
    const { data, isLoading, isSuccess, refetch } = useGetPiecesRandomQuery(undefined, {
        selectFromResult: ({ data, ...otherParams }) => ({
            data: piecesSelector.selectAll(data ?? piecesAdapter.getInitialState()),
            ...otherParams,
        }),
    });

    function refreashSuggestion() {
        refetch()
    }

    return {
        pieces: data,
        isLoading,
        isSuccess,
        refreashSuggestion,
    }
}