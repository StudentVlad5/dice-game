export interface GameResult {
  date: number;
  userNumber: number;
  over: boolean;
  winNumber: number;
}

export interface SnackbarData {
  open: boolean;
  message: string;
  message_2?: string;
  severity: "success" | "error";
}

export interface TopMainBarProps {
  winNumber: number | null;
  over: boolean;
  number: number;
  setResults: React.Dispatch<React.SetStateAction<GameResult[]>>;
  setNumber: (num: number) => void;
  setWinNumber: (num: number | null) => void;
  setOver: (over: boolean) => void;
  setSnackbar: (data: SnackbarData) => void;
}

export interface ShowToastParams {
  message: string;
  severity: "success" | "error";
  message_2?: string;
  setSnackbar: (data: SnackbarData) => void;
}

export interface SnackbarBlockProps {
  snackbar: SnackbarData;
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarData>>;
}

export interface HistoryTableProps {
  results: GameResult[];
  isWin: (r: GameResult) => boolean;
}
