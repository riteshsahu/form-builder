import { Box } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router";
import { BuildFormPage } from "./pages/build";
import { FillFormPage } from "./pages/form";
import { HomePage } from "./pages/home";

function App() {
  return (
    <Box h="full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forms/:id" element={<FillFormPage />} />
        <Route path="/build/:id" element={<BuildFormPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
}

export default App;
