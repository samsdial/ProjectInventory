export interface IAuthState {
    isAuthenticated: boolean;
    data: IUser;
}

export interface IUser {
    token: string;
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface IAuthResponse {
    error: IAuthError | null;
    data: IUser | null
}

export interface IAuthError {
    status: number;
    message: string;
}

export interface IAuthCredentials {
    email: string;
    password: string;
}
export interface IFormRegister {
    userName: string;
    email: string;
    password: string;
}
