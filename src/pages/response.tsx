import { AlertInfoCard } from "@/components/alert-info-card";
import { BackButton } from "@/components/back-button";
import { Loader } from "@/components/loader";
import { ResponseCard } from "@/components/response-card";
import { useFetch } from "@/hooks/useFetch";
import { FormService } from "@/lib/form-service";
import { Alert, Box, Center, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

export function FormResponsePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isSubmitted = Boolean(searchParams.get("submitted"));

  const gerResponse = useCallback(() => {
    if (!id) return Promise.reject(new Error("No response ID provided"));
    return FormService.getResponseById(id);
  }, [id]);

  const { data: formResponse, loading } = useFetch(gerResponse);

  if (loading) return <Loader />;

  return (
    <Box p={5} h="full" display="flex" flexDir="column" alignItems="flex-start">
      <BackButton
        mb={4}
        lg={{ pos: "absolute" }}
        onClick={() => navigate("/")}
      />
      <VStack flex="1" maxW={"800px"} alignSelf="center" w="full">
        {isSubmitted && (
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Title>Thank you for submitting the form!</Alert.Title>
          </Alert.Root>
        )}
        {formResponse && id ? (
          <ResponseCard {...formResponse} />
        ) : (
          <Center justifyContent="center" h="full">
            <AlertInfoCard
              title="Form response not found"
              description="The form response you are looking for does not exist"
            />
          </Center>
        )}
      </VStack>
    </Box>
  );
}
