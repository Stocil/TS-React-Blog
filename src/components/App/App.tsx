import AppRoutes from "../Routes";
import Header from "../Header";
import { Box } from "@mui/material";
import { FC } from "react";

const App: FC = () => {
  return (
    <Box component="main" pt={10}>
      <Header />
      <AppRoutes />
    </Box>
  );
};

export default App;
