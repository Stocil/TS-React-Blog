import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

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
