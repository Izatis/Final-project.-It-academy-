export interface IUser {
  id: number
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string
}

export interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}