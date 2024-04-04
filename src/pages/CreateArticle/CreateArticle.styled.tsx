import { IconButton, Stack, styled, Typography } from "@mui/material";

export const TagControlWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
}));

export const Tag = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: 10,
}));

export const DeleteTagButton = styled(IconButton)({
  padding: 0,
  "&:hover": { backgroundColor: "transparent" },
});
