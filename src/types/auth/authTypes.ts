// Auth Slice
export interface AuthState {
    user: string
    isAuthenticated: boolean
}

// Request Body
export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface RegisterRequestBody {
    email: string;
    password: string;
    re_password: string;
}

// Response Body
export interface TokenInvalidErrorBody {
    detail: string;
    code: string;
    messages: {
        token_class: string;
        token_type: string;
        message: string;
    }[];
}