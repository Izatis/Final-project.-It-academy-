export interface IVideoState {
  lessonIdBackend: string;
  isLoading: boolean;
  error: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params
export interface IAddingAVideoParams {
  file: any;
  lessonId: string;
  parsedToken: string;
}
