export interface IUserRegistration {
  fullName: string;
  email: string;
  password: string;
}

export interface IUserAuthorization {
  username: string;
  password: string;
}

export interface IAuthState {
  token: string;
  isLoading: boolean;
  isError?: string;
}
