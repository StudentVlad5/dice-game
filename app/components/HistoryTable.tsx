import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { HistoryTableProps } from "./helps/Interfaces";

export default function HistoryTable({ results, isWin }: HistoryTableProps) {
  if (!results || results.length === 0) {
    return null;
  }
  return (
    <>
      {results.length > 0 && (
        <Paper
          elevation={3}
          sx={{ width: "100%", maxWidth: 600, overflow: "hidden" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "action.hover" }}>
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
                      bgcolor: win
                        ? "rgba(46, 125, 50, 0.15)"
                        : "rgba(211, 47, 47, 0.15)",
                    }}
                  >
                    <TableCell>
                      {new Date(r.date).toLocaleTimeString("uk-UA")}
                    </TableCell>
                    <TableCell>
                      {r.over ? "Over" : "Under"}{" "}
                      <strong>{r.userNumber}</strong>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold", pr: 3 }}>
                      {r.winNumber}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </>
  );
}
