"use client";

import { useState } from "react";
import { Stack } from "@mui/material";
import TopMainBar from "./TopMainBar";
import { GameResult, SnackbarData } from "./helps/Interfaces";
import SnackbarBlock from "./Snackbar";
import HistoryTable from "./HistoryTable";

export default function Game() {
  const [number, setNumber] = useState(50);
  const [over, setOver] = useState(false);
  const [winNumber, setWinNumber] = useState<number | null>(null);

  const [results, setResults] = useState<GameResult[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem("results");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse history", e);
      return [];
    }
  });

  const [snackbar, setSnackbar] = useState<SnackbarData>({
    open: false,
    message: "",
    message_2: "",
    severity: "success",
  });

  const isWin = (r: GameResult) =>
    r.over ? r.winNumber > r.userNumber : r.winNumber < r.userNumber;

  return (
    <Stack spacing={4} alignItems="center" sx={{ py: 4 }}>
      <TopMainBar
        winNumber={winNumber}
        over={over}
        number={number}
        setResults={setResults}
        setNumber={setNumber}
        setWinNumber={setWinNumber}
        setOver={setOver}
        setSnackbar={setSnackbar}
      />
      <HistoryTable results={results} isWin={isWin} />
      <SnackbarBlock snackbar={snackbar} setSnackbar={setSnackbar} />
    </Stack>
  );
}
