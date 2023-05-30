export interface ICourse {
  id: number;
  name: string;
  description: string;
  created: string;
  price: number;
  language: string;
  image: string;
}

export interface ICourseState {
  courses: ICourse[];
  course:  any;
  isLoading: boolean;
  error: string;
}
