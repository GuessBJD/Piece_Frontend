import { RootState } from "@/app/store"
import { PiecesState } from "@/types"
import { piecesAdapter, piecesSelector } from "./piecesApiSlice"
import { createSlice } from "@reduxjs/toolkit"

/*
const initialState: PiecesState = {
    page: {
        next_page: null,
        loaded_pages: null,
        last_page: null,
    },
    pieces: piecesAdapter.getInitialState()
}

const piecesSlice = createSlice({
    name: "pieces",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setPieces: (state, action) => {
            state.pieces = piecesAdapter.setMany(state.pieces, piecesSelector.selectAll(action.payload));
        },
        resetState: (state) => {
            state = initialState;
        }
    },
})

export const { setPage, setPieces, resetState } = piecesSlice.actions

export const selectPieces = (state: RootState) => state.pieces.pieces

export const selectPage = (state: RootState) => state.pieces.page

export default piecesSlice.reducer
*/