import { TextInput } from "@/components/ui";
import { DEFAULT_FORM_TITLE, defaultQuestion } from "@/constants";
import { FormService } from "@/lib/form-service";
import { FormSchema } from "@/lib/types";
import { generateUUID, parseError } from "@/utils";
import {
  AbsoluteCenter,
  Box,
  Button,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { QuestionCard } from "./question-card";
import { Link } from "react-router";

export function FormBuilder({
  id,
  values,
}: {
  id: string;
  values?: FormSchema;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<FormSchema>({
    defaultValues: {
      ...values,
      title: values?.title,
      questions: values?.questions ?? [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const title = form.watch("title");

  useEffect(() => {
    const upsertForm = async () => {
      try {
        setLoading(true);
        await FormService.upsertForm({
          title: title || DEFAULT_FORM_TITLE,
          id,
        });
      } catch (error) {
        setError(parseError(error));
      } finally {
        setLoading(false);
      }
    };

    upsertForm();
  }, [id, title]);

  const onAddQuestion = () => {
    append({
      ...defaultQuestion,
      id: generateUUID(),
    });
  };

  if (error) {
    return (
      <AbsoluteCenter>
        <Heading>{error}</Heading>
      </AbsoluteCenter>
    );
  }

  return (
    <FormProvider {...form}>
      <Box maxWidth={800} mx="auto">
        <Box>
          <Controller
            control={form.control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                name="title"
                placeholder="Enter form title"
                onChange={onChange}
              />
            )}
          />
        </Box>
        <VStack w={"full"} alignItems={"stretch"} gap={5} mt={5}>
          {fields.map((field, index) => (
            <QuestionCard
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
              formId={id}
            />
          ))}
        </VStack>
        {form.formState.isValid && (
          <HStack alignItems={"center"} mt={5} justifyContent={"space-between"}>
            <Button onClick={onAddQuestion}>Add Question</Button>
            {fields.length > 0 && (
              <Button asChild colorPalette={"blue"} disabled={loading}>
                <Link to={`/forms/${id}`}>Preview</Link>
              </Button>
            )}
          </HStack>
        )}
      </Box>
    </FormProvider>
  );
}
