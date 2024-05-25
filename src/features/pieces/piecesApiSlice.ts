import Cookies from "js-cookie"
import { store } from "@/app/store"
import { apiSlice } from "../api/apiSlice"
import { createEntityAdapter } from "@reduxjs/toolkit"
import {
    GetPiecesRequestParams,
    GetPiecesResponseBody,
    Piece,
    RetriveUpdateDeletePieceRequestParams,
    CreateUpdatePieceRequestBody,
    GetPieceDetailResponseBody,
    GetPiecesRandomResponseBody,
} from "@/types"

const piecesAdapter = createEntityAdapter({
    selectId: (piece: Piece) => piece.slug
})

const piecesSelector = piecesAdapter.getSelectors()

const piecesInitialState = piecesAdapter.getInitialState()

export const piecesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPieces: builder.query<any, GetPiecesRequestParams>({
            query: (params) => ({
                url: "/pieces/",
                method: "GET",
                credentials: "include",
                params: params,
            }),
            transformResponse: (response: GetPiecesResponseBody) => {
                const responseData = {
                    page: response.page,
                    results: piecesAdapter.setAll(piecesInitialState, response.results)
                }
                return responseData
            },
            merge: (currentCache, responseData) => {
                currentCache.page = responseData.page
                currentCache.results = piecesAdapter.setMany(currentCache.results, piecesSelector.selectAll(responseData.results))
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.page !== previousArg?.page
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}`
            },
        }),
        getPiecesRandom: builder.query<any, any>({
            query: () => ({
                url: "/pieces/suggestions/",
                method: "GET",
                credentials: "include",
            }),
            transformResponse: (response: GetPiecesRandomResponseBody) => {
                return piecesAdapter.setAll(piecesInitialState, response.results)
            },
            providesTags: (result, error) => [
                ...result.ids.map((slug : string) => ({type: "Piece", id: slug }))
            ]
        }),
    }),
    overrideExisting: true,
})

export const pieceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPiece: builder.mutation<Piece, CreateUpdatePieceRequestBody>({
            query: (body) => ({
                url: "/pieces/",
                method: "POST",
                headers: {
                    'X-CSRFToken': Cookies.get("csrftoken")
                },
                credentials: "include",
                body: body
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try{
                    const { data } = await queryFulfilled
                    const cachedArgs = piecesApiSlice.util.selectCachedArgsForQuery(store.getState(), "getPieces")
                    if (cachedArgs?.length > 0) {
                        const patchResult = dispatch(
                            piecesApiSlice.util.updateQueryData(
                                "getPieces", 
                                { page: cachedArgs[0].page }, 
                                (draft) => {
                                    const newState = piecesAdapter.setOne(piecesInitialState, data)
                                    draft.results = piecesAdapter.setMany(newState, piecesSelector.selectAll(draft.results))
                                }
                            )
                        )
                    }
                }catch(error){
                }
            }
        }),
        getPiece: builder.query<GetPieceDetailResponseBody, RetriveUpdateDeletePieceRequestParams>({
            query: ({ slug }) => ({
                url: `/pieces/${slug}/`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, { slug }) => [
                { type: "Piece"},
                { type: "Piece", id: slug }
            ]
        }),
        updatePiece: builder.mutation<Piece, RetriveUpdateDeletePieceRequestParams & Partial<CreateUpdatePieceRequestBody>>({
            query: ({ slug, ...patch }) => ({
                url: `/pieces/${slug}/`,
                method: "PUT",
                headers: {
                    'X-CSRFToken': Cookies.get("csrftoken")
                },
                credentials: "include",
                body: patch,
            }),
            invalidatesTags: (result, error, { slug }) => [
                { type: "Piece", id: slug }
            ],
            async onQueryStarted({ slug, ...patch }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { text } = data
                    const cachedArgs = piecesApiSlice.util.selectCachedArgsForQuery(store.getState(), "getPieces")
                    if (cachedArgs?.length > 0) {
                        const patchResult = dispatch(
                            piecesApiSlice.util.updateQueryData(
                                "getPieces", 
                                { page: cachedArgs[0].page }, 
                                (draft) => {
                                    draft.results = piecesAdapter.updateOne(draft.results, { id: slug, changes: {text} })
                                }
                            )
                        )
                    }
                } catch (error) {
                }
            },
        }),
        deletePiece: builder.mutation<void, RetriveUpdateDeletePieceRequestParams>({
            query: ({ slug }) => ({
                url: `/pieces/${slug}/`,
                method: "DELETE",
                headers: {
                    'X-CSRFToken': Cookies.get("csrftoken")
                },
                credentials: "include",
            }),
            async onQueryStarted({ slug }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const cachedArgs = piecesApiSlice.util.selectCachedArgsForQuery(store.getState(), "getPieces")
                    if (cachedArgs?.length > 0) {
                        const patchResult = dispatch(
                            piecesApiSlice.util.updateQueryData(
                                "getPieces", 
                                { page: cachedArgs[0].page }, 
                                (draft) => {
                                    draft.results = piecesAdapter.removeOne(draft.results, slug)
                                }
                            )
                        )
                    }
                } catch (error) {
                }
            }
        }),
    }),
    overrideExisting: true,
})

export const { useGetPiecesQuery, useLazyGetPiecesQuery, useGetPiecesRandomQuery } = piecesApiSlice

export const { useCreatePieceMutation, useGetPieceQuery, useUpdatePieceMutation, useDeletePieceMutation } = pieceApiSlice

export {
    piecesAdapter,
    piecesSelector,
}