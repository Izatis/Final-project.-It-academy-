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

export interface IEditingUser {
  fullName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  passwordSecond: string;
  imageUrl: string;
}
