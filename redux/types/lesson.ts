export interface ILesson {
  id: number;
  title: string;
  description: string;
  duration: number;
  videoName: string;
  videoUrl: string;
}

export interface ILessonState {
  lessons: ILesson[];
  isLoading: boolean;
  error: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params
export interface IAddingALesson {
  title: string;
  description: string;
}

export interface IToGetLessonsParams {
  id: number;
  parsedToken: string;
}

export interface IAddingALessonParams {
  sectionId: number;
  value: IAddingALesson;
  parsedToken: string;
}
