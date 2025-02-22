import { BackButton } from "@/components/back-button";
import { FormRenderer } from "@/components/form-renderer";
import { Box, VStack } from "@chakra-ui/react";
import { useParams } from "react-router";
export function FillFormPage() {
  const { id } = useParams();

  return (
    <Box p={5} h="full" display="flex" flexDir="column" alignItems="flex-start">
      <BackButton mb={4} lg={{ pos: "absolute" }} />
      <VStack flex="1" maxW={"800px"} alignSelf="center" w="full">
        <FormRenderer id={id} />
      </VStack>
    </Box>
  );
}
