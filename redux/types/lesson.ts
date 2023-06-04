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
  lessonIdBackend: string;
  isLoading: boolean;
  error: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params
export interface IAddingALesson {
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
}

export interface IToGetLessonsParams {
  token: string;
  sectionId: number;
}

export interface IAddingALessonParams {
  sectionId: number;
  value: IAddingALesson;
  parsedToken: string;
}
