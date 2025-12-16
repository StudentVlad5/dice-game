"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

interface GameResult {
  date: number;
  userNumber: number;
  over: boolean;
  winNumber: number;
}

export default function Game() {
  const [number, setNumber] = useState(50);
  const [over, setOver] = useState(false);
  const [winNumber, setWinNumber] = useState<number | null>(null);
  const [results, setResults] = useState<GameResult[]>([]);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const saved = localStorage.getItem("results");
    if (saved) setResults(JSON.parse(saved));
  }, []);

  const play = () => {
    if (number <= 0 || number >= 100) {
      showToast("Number must be between 0 and 100", "error");
      return;
    }
    const rnd = Math.floor(Math.random() * 101);
    setWinNumber(rnd);

    const win = over ? rnd > number : rnd < number;
    if (win) {
      showToast("You win!", "success");
    } else {
      showToast("You lose!", "error");
    }
    const updated = [
      ...results,
      {
        date: Date.now(),
        userNumber: number,
        over,
        winNumber: rnd,
      },
    ].slice(-10);

    setResults(updated);
    localStorage.setItem("results", JSON.stringify(updated));
  };

  const isWin = (r: GameResult) =>
    r.over ? r.winNumber > r.userNumber : r.winNumber < r.userNumber;

  const showToast = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Stack spacing={4} alignItems="center">
      {/* MAIN BLOCK 320px */}
      <Stack spacing={2} width={320} alignItems="center">
        {/* WIN NUMBER */}
        <Typography variant="h3" textAlign="center">
          {winNumber ?? "—"}
        </Typography>

        {/* OVER / UNDER */}
        <RadioGroup
          row
          value={over ? "over" : "under"}
          onChange={(e) => setOver(e.target.value === "over")}
        >
          <FormControlLabel
            value="under"
            control={<Radio color="primary" />}
            label="Under"
          />
          <FormControlLabel
            value="over"
            control={<Radio color="primary" />}
            label="Over"
          />
        </RadioGroup>

        {/* SLIDER */}
        <Slider
          value={number}
          min={0}
          max={100}
          onChange={(_, v) => setNumber(v as number)}
          valueLabelDisplay="on"
          color="primary"
        />

        {/* BUTTON */}
        <Button variant="contained" color="primary" fullWidth onClick={play}>
          PLAY
        </Button>
      </Stack>

      {/* HISTORY 600px */}
      {results.length > 0 && (
        <Paper sx={{ width: 600 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Guess</TableCell>
                <TableCell align="right">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...results].reverse().map((r) => {
                const win = isWin(r);
                return (
                  <TableRow
                    key={r.date}
                    sx={{
                      bgcolor: win ? "success.light" : "error.light",
                    }}
                  >
                    <TableCell>
                      {new Date(r.date).toLocaleTimeString("uk-UA")}
                    </TableCell>
                    <TableCell>
                      {r.over ? "Over" : "Under"} {r.userNumber}
                    </TableCell>
                    <TableCell align="right">{r.winNumber}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
