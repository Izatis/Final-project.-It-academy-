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
  token: string;
  value: string;
}

export interface ISearchByCategoryParams {
  token: string;
  value: string;
}
