export interface ICourse {
  id: number;
  name: string;
  description: string;
  created: string;
  price: number;
  language: string;
  imageName: string;
  imageUrl: string;
  duration: number;
}

export interface ICourseState {
  courses: ICourse[];
  isLoading: boolean;
  error: string;
}
