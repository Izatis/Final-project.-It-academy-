export interface ICourse {
  id: number;
  name: string;
  description: string;
  created: string;
  price: number;
  language: string;
  imageName: string;
  imageUrl: string;
}

export interface ICourseState {
  courses: ICourse[];
  course: ICourse;
  isLoading: boolean;
  error: string;
}
