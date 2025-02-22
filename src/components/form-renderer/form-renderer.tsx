import { FormService } from "@/lib/form-service";
import { FormSchema } from "@/lib/types";
import { Box, Center, Heading, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QuestionField } from "./question-field";
import { AlertInfoCard } from "@/components/alert-info-card";

export function FormRenderer({ id }) {
  const [form, setForm] = useState<FormSchema | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      if (id) {
        setLoading(true);

        const schema = await FormService.getFormById(id);

        setForm(schema);
        setLoading(false);
      }
    };
    fetchForms();
  }, [id]);

  if (loading) {
    return (
      <Center justifyContent="center" h="full">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Box flex={1} w="full">
      <Heading size="2xl" mb={5}>
        {form?.title}
      </Heading>
      {form ? (
        <VStack gap={5}>
          {form.questions.map((question) => (
            <QuestionField key={question.id} question={question} />
          ))}
        </VStack>
      ) : (
        <Center justifyContent="center" h="full">
          <AlertInfoCard title="Form not found" description="The form you are looking for does not exist" />
        </Center>
      )}
    </Box>
  );
}
