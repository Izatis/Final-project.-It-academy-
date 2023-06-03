interface ISection {
  name: string;
  id: number;
}

export interface ISectionState {
  sections: ISection[];
  sectionIdBackend: any;
  isLoading: boolean;
  error: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params

export interface ICreatePartition {
  name: string;
}

export interface IGettingPartitionsParams {
  courseId: number;
  parsedToken: string;
}

export interface ICreatePartitionParams {
  courseId: number;
  value: ICreatePartition;
  parsedToken: string;
}
