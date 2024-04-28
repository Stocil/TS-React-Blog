import { Alert, Snackbar } from "@mui/material";
import { ReactNode } from "react";

type AlertSnackbarProps = {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  color?: "success" | "error";
};

export const AlertSnackbar = ({
  open,
  handleClose,
  children,
  color = "success",
}: AlertSnackbarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={color}
        variant="filled"
        sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
};
