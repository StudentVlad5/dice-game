import { Alert, Snackbar } from "@mui/material";
import { SnackbarBlockProps } from "./helps/Interfaces";

export default function SnackbarBlock({
  snackbar,
  setSnackbar,
}: SnackbarBlockProps) {
  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        variant="filled"
        sx={{
          // minWidth: "600px",
          display: "flex",
          alignItems: "center",
          "& .MuiAlert-message": {
            width: "100%",
            textAlign: "start",
          },
          fontSize: "1.2rem",
        }}
      >
        {snackbar.message}
        {snackbar.message_2 && (
          <>
            <br />
            <span>{snackbar.message_2}</span>
          </>
        )}
      </Alert>
    </Snackbar>
  );
}
