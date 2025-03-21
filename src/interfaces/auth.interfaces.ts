export interface IUser {
    id: string;
    email: string;
    username: string;
    role: 'ADMIN' | 'CLIENT' | 'STAFF';
    createdAt: Date;
    updatedAt: Date;
}

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface ISignupRequest {
    email: string;
    role: 'ADMIN' | 'CLIENT' | 'STAFF';
}

export interface IAuthResponse {
    user: Omit<IUser, 'password'>;
    token: string;
}
