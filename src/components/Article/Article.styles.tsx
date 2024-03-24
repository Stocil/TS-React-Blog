import {
  Avatar,
  Paper,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";

export const ArticleWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
}));

export const ArticleInfoWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
}));

export const ArticleTagsWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
}));

export const ArticleUserWrapper = styled(Stack)({
  minWidth: 250,
  alignItems: "end",
});

export const ArticleUserInner = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
}));

export const ArticleUserAvatar = styled(Avatar)({
  width: 45,
  height: 45,
});

export const ArticleDescription = styled(Typography)({
  maxWidth: "calc(100% - 45px)",
  minWidth: 200,
});

export const HtmlTooltip = styled(
  ({ className, children, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} children={children} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 220,
    padding: theme.spacing(2),
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));
