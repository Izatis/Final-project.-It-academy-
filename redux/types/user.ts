import { ICourse } from "./course";

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

export interface IUserState {
  users: IUser[];
  user: IUser;
  userCourses: ICourse[];
  isLoading: boolean;
  error: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params
export interface IEditingUser {
  fullName: string;
  dateOfBirth: number;
  email: string;
  password: string;
  passwordSecond: string;
  imageUrl: string;
}

export interface IGetAllUserCoursesParams {
  userId: number;
  parsedToken: string;
}

export interface IEditingUserParams {
  value: IEditingUser;
  id: number;
  parsedToken: string;
}
