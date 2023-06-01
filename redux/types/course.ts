export interface ICourse {
  id: number;
  name: string;
  description: string;
  created: string;
  price: number;
  language: string;
  author: string;
  imageName: string;
  imageUrl: string;
  duration: number;
}

export interface ILesson {
  title: string;
  description: string;
  duration: number;
  videoName: string;
  videoUrl: string;
}

interface ISection {
  name: string;
  id: number;
}

export interface ICourseState {
  courses: ICourse[];
  course: any;
  sections: ISection[];
  lessons: ILesson[];
  isLoading: boolean;
  error: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params

export interface IGettingACourseParams {
  id: number;
  parsedToken: string;
  thunkApi?: any;
}

export interface IToGetLessonsParams {
  id: number;
  parsedToken: string;
  thunkApi?: any;
}

export interface IReceiveCourseSectionsParams {
  id: number;
  parsedToken: string;
  thunkApi?: any;
}

export interface IPriceFilteringParams {
  option: string;
  parsedToken: string;
  thunkApi?: any;
}

export interface ILanguageFilteringParams {
  language: string;
  parsedToken: string;
  thunkApi?: any;
}
