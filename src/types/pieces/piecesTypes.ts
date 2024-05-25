import { EntityState } from "@reduxjs/toolkit";

// Piece types
export interface Piece {
    text: string;
    user: number;
    slug: string;
    created_at: string;
}

export interface UDPerms {
    update: boolean;
    delete: boolean;
}

export interface Page {
    loaded_pages: number | null;
    next_page: number | null;
    last_page: number | null;
}

export interface Pieces {
    page: Page;
    pieces: EntityState<Piece, string>;
}

// API Slice
// Request Query Params
export interface GetPiecesRequestParams {
    page: number | null;
}

export interface RetriveUpdateDeletePieceRequestParams {
    slug: string;
}

export interface CreateUpdatePieceRequestBody {
    text: string;
}

// Response Body
export interface GetPiecesResponseBody {
    page: Page;
    count: number;
    results: Piece[]
}

export interface GetPiecesRandomResponseBody {
    count: number;
    results: Piece[]
}

export interface GetPieceDetailResponseBody {
    result: Piece;
    perms: UDPerms;
}