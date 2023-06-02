interface ICategory {
  id: number;
  title: string;
  image: string
}

export interface ICategoryState {
  categories: ICategory[];
  isLoading: boolean;
  error: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params
export interface IGettingACategory {
  parsedToken: string;
}
