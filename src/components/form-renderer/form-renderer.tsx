import { FormResponseSchema, FormSchema, QuestionSchema } from "@/lib/types";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { QuestionField } from "./question-field";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FormService } from "@/lib/form-service";
import { toaster } from "@/components/ui";
import { useNavigate } from "react-router";

export function FormRenderer({
  id,
  formSchema,
}: {
  id: string;
  formSchema: FormSchema;
}) {
  const navigate = useNavigate();
  const form = useForm<FormResponseSchema>({
    defaultValues: {
      answers: formSchema.questions?.map((question) => ({
        title: question.title,
        value: question.defaultValue || "",
      })),
    },
  });

  const onSubmit = async (data: FormResponseSchema) => {
    try {
      const response = await FormService.saveFormResponse({
        ...data,
        formId: id,
        title: formSchema.title,
      });
      navigate(`/responses/${response.id}?submitted=true`);
    } catch (error) {
      toaster.create({
        title: "Failed to save response",
        type: "error",
        id: "save-response-error",
      });
      console.error("Failed to save response:", error);
    }
  };

  function getValidationRules(question: QuestionSchema) {
    return {
      ...(question.isRequired && {
        required: {
          value: question.isRequired,
          message: `This field is required`,
        },
      }),
      ...(question.min && {
        min: {
          value: question.min,
          message: `The value must be at least ${question.min}`,
        },
      }),
      ...(question.max && {
        max: {
          value: question.max,
          message: `The value must be at most ${question.max}`,
        },
      }),
    };
  }

  return (
    <FormProvider {...form}>
      <Box asChild flex={1} w="full" mb={50}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate={true}>
          <Heading size="2xl" mb={5}>
            {formSchema.title}
          </Heading>
          {formSchema.questions?.length && (
            <VStack gap={5}>
              {formSchema.questions?.map((question, index) => (
                <Controller
                  key={question.id}
                  name={`answers.${index}.value`}
                  control={form.control}
                  rules={getValidationRules(question)}
                  render={({ field, fieldState }) => (
                    <QuestionField
                      question={question}
                      errorText={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
              ))}
            </VStack>
          )}
          <Box textAlign="right" mt={4}>
            <Button
              disabled={form.formState.isSubmitting}
              loading={form.formState.isSubmitting}
              type="submit"
              size="lg"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </FormProvider>
  );
}
