import { Stack, styled } from "@mui/material";

const HeaderWrapper = styled(Stack)({
  flexGrow: "1",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const HeaderMobileWrapper = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flexGrow: 1,
});

export default HeaderWrapper;
