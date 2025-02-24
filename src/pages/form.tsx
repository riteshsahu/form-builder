import { AlertInfoCard } from "@/components/alert-info-card";
import { BackButton } from "@/components/back-button";
import { FormRenderer } from "@/components/form-renderer";
import { Loader } from "@/components/loader";
import { useFetch } from "@/hooks/useFetch";
import { FormService } from "@/lib/form-service";
import { Box, Center, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useParams } from "react-router";
export function FillFormPage() {
  const { id } = useParams();

  const getForm = useCallback(() => {
    if (!id) return Promise.reject(new Error("No form ID provided"));
    return FormService.getFormById(id);
  }, [id]);

  const { data: formSchema, loading } = useFetch(getForm);

  if (loading) return <Loader />;

  return (
    <Box p={5} h="full" display="flex" flexDir="column" alignItems="flex-start">
      <BackButton mb={4} lg={{ pos: "absolute" }} />
      <VStack flex="1" maxW={"800px"} alignSelf="center" w="full">
        {formSchema && id ? (
          <FormRenderer id={id} formSchema={formSchema} />
        ) : (
          <Center justifyContent="center" h="full">
            <AlertInfoCard
              title="Form not found"
              description="The form you are looking for does not exist"
            />
          </Center>
        )}
      </VStack>
    </Box>
  );
}
