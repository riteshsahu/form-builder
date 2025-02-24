import { AlertInfoCard } from "@/components/alert-info-card";
import { BackButton } from "@/components/back-button";
import { Loader } from "@/components/loader";
import { ResponseCard } from "@/components/response-card";
import { useFetch } from "@/hooks/useFetch";
import { FormService } from "@/lib/form-service";
import { Box, Center, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useParams } from "react-router";

export function FormAllResponsePage() {
  const { id } = useParams();

  const gerResponses = useCallback(() => {
    if (!id) return Promise.reject(new Error("No form ID provided"));
    return FormService.getAllResponsesByFormId(id);
  }, [id]);

  const { data: responses = [], loading } = useFetch(gerResponses);

  if (loading) return <Loader />;

  return (
    <Box p={5} h="full" display="flex" flexDir="column" alignItems="flex-start">
      <BackButton mb={4} lg={{ pos: "absolute" }} />
      <VStack flex="1" maxW={"800px"} alignSelf="center" w="full">
        {responses.length > 0 && id ? (
          <VStack w={"full"} gap={5}>
            {responses.map((response) => (
              <ResponseCard key={response.id} {...response} />
            ))}
          </VStack>
        ) : (
          <Center justifyContent="center" h="full">
            <AlertInfoCard title="No form response found" />
          </Center>
        )}
      </VStack>
    </Box>
  );
}
