import { BackButton } from "@/components/back-button";
import { FormBuilder } from "@/components/form-builder";
import { Loader } from "@/components/loader";
import { useFetch } from "@/hooks/useFetch";
import { FormService } from "@/lib/form-service";
import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import { useParams } from "react-router";

export function BuildFormPage() {
  const { id } = useParams();

  const getForm = useCallback(() => {
    if (!id) return Promise.reject(new Error("No form ID provided"));
    return FormService.getFormById(id);
  }, [id]);

  const { data: formValues, loading } = useFetch(getForm);

  if (loading) return <Loader />;

  return (
    <Box p={4}>
      <BackButton mb={3} lg={{ pos: "absolute" }} />

      {id && <FormBuilder id={id} values={formValues} />}
    </Box>
  );
}
