export interface Pokemon {
  id: string;
  name: string;
}

export enum AppState {
  INITIAL,
  CAPTURING,
  CAPTURED,
  GENERATING,
  RESULT,
}
