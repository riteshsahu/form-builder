import { BackButton } from "@/components/back-button";
import { FormBuilder } from "@/components/form-builder";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router";

export function BuildFormPage() {
  const { id } = useParams();

  return (
    <Box p={4}>
      <BackButton mb={3} lg={{ pos: "absolute" }} />

      <FormBuilder id={id} />
    </Box>
  );
}
