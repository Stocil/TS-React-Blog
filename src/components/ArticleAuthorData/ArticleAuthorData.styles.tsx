import {
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";

export const HtmlTooltip = styled(
  ({ className, children, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} children={children} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export const ArticleUserInner = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),

  [theme.breakpoints.down("ss")]: {
    flexDirection: "column-reverse",
    alignItems: "end",
  },
}));

export const ArticleUsername = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("ss")]: {
    fontSize: theme.typography.body1.fontSize,
  },
}));
