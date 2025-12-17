import { ShowToastParams } from "./Interfaces";

export default function showToast({
  message,
  severity,
  message_2,
  setSnackbar,
}: ShowToastParams) {
  return setSnackbar({
    open: true,
    message,
    severity,
    message_2: message_2 || "",
  });
}
