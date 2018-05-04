export interface UserInfo {
  userId: number;
  userName: string;
  rank: string;
  condition: string;
  wins: number;
  defeats: number;
}

export interface MatchData {
  gameId: string;
  player1: UserInfo | null;
  player2: UserInfo | null;
}

export interface GameConf {
  opponent: UserInfo;
  gameId: string;
  minutes: number;
  seconds: number;
  handicap: string;
}

export interface Pos {
  onBoard: Array<Array<number>>;
  caps0: Array<number>;
  caps1: Array<number>;
}

export interface GameData {
  gameId: string;
  isPlaying: boolean;
  player0: UserInfo;
  player1: UserInfo;
  turn: 0 | 1;
  handicap: string;
  minutes: number;
  seconds: number;
  positions: Pos;
  kif: Array<string>;
  remainingTime0: number;
  remainingTime1: number;
}

export interface CellState {
  row: number;
  column: number;
  pieceNum: number;
}
