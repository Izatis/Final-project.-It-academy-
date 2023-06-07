export interface ICourse {
  id: number;
  name: string;
  description: string;
  created: string;
  price: number;
  language: string;
  author: string;
  authorId: number
  imageName: string;
  imageUrl: string;
  duration: number;
  grade: number
}


export interface ICoursesAmoutnPage {
    courses: ICourse[]
    amountPage: number
}


export interface ICourseState {
  coursesAmountPage: ICoursesAmoutnPage;
  courseIdBackend: any
  isLoading: boolean;
  error: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params

export interface ICourseCreation {
  name: string;
  description: string;
  price: string;
  language: string;
}

export interface ICourseCreationParams {
  categoryId: number;
  value: ICourseCreation;
  parsedToken: string;
}

export interface IPriceFilteringParams {
  token: string;
  categoryId: number;
  pageNumber: number;
  option: string;
}

export interface ILanguageFilteringParams {
  token: string;
  categoryId: number
  pageNumber: number
  option: string;
}
