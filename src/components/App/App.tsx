import AppRoutes from "../Routes";
import Header from "../Header";
import { Box } from "@mui/material";

function App() {
  return (
    <Box component="main" pt={10}>
      <Header />
      <AppRoutes />
    </Box>
  );
}

export default App;
