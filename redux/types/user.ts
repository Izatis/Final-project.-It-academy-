export interface IUser {
  id: 0;
  fullName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  role: string;
  imageName: string;
  imageUrl: string;
}

export interface UserState {
  users: IUser[];
  user: IUser;
  isLoading: boolean;
  error: string;
}
