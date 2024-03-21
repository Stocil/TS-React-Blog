import { Alert, Snackbar } from "@mui/material";

type AlertSnackbarProps = {
  open: boolean;
  handleClose: () => void;
};

export const AlertSnackbar = ({ open, handleClose }: AlertSnackbarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}>
        The data has been successfully changed
      </Alert>
    </Snackbar>
  );
};
