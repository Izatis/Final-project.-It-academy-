import { ICategory } from "./category";
import { ICourse } from "./course";

export interface ISearchState {
  resultByCategory: ICategory[];
  courseResults: ICourse[];
  isLoading: boolean;
  isError: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params
export interface ISearchByCoursesParams {
  value: string;
  parsedToken: string;
}

export interface ISearchByCategoryParams {
  value: string;
  parsedToken: string;
}
