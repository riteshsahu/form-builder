import { Box } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router";
import { BuildFormPage } from "./pages/build";
import { FillFormPage } from "./pages/form";
import { HomePage } from "./pages/home";
import { FormResponsePage } from "@/pages/response";
import { FormAllResponsePage } from "@/pages/form-responses";
import { Header } from "@/components/header";

function App() {
  return (
    <Box h="full">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forms/:id" element={<FillFormPage />} />
        <Route path="/build/:id" element={<BuildFormPage />} />
        <Route path="/responses/:id" element={<FormResponsePage />} />
        <Route path="/forms/:id/responses" element={<FormAllResponsePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
}

export default App;
