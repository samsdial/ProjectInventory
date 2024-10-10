export interface IAuthState {
    isAuthenticated: boolean;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface IAuthResponse {
    token: string;
    user: IUser;
    message: string;
}

export interface IAuthError {
    state: string;
    message: string;
}

export interface IAuthCredentials {
    email: string;
    password: string;
}