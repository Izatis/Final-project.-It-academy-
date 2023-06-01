// export interface IStatistics {
//   numberFirst: number
//   numberSecond: number
//   numberTrird: number
//   numberFourth: number
// }

export interface IStatisticsState {
  statistics: any
  isLoading: boolean;
  error: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Params
export interface IGettingStatisticsParams {
  parsedToken: string;
}
