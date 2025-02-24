import { QuestionOptions } from "@/components/form-builder/question-options";
import {
  Checkbox,
  NumberInput,
  SelectInput,
  TextInput,
  toaster,
} from "@/components/ui";
import { NumberType, QuestionType } from "@/constants";
import useToggle from "@/hooks/useToggle";
import { FormService } from "@/lib/form-service";
import { FormSchema } from "@/lib/types";
import { capitalize } from "@/utils";
import {
  Box,
  Card,
  Collapsible,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { LuChevronDown, LuTrash } from "react-icons/lu";
import { useDebouncedCallback } from "use-debounce";

const questionOptions = Object.values(QuestionType).map((type) => ({
  value: type,
  label: capitalize(type),
}));

const numberOptions = Object.values(NumberType).map((type) => ({
  value: type,
  label: capitalize(type),
}));

export function QuestionCard({
  formId,
  index,
  onRemove,
}: {
  formId: string;
  index: number;
  onRemove: () => void;
}) {
  const [isOpen, onToggle] = useToggle(true);
  const { control, watch, trigger } = useFormContext<FormSchema>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState(false);

  const questionType = watch(`questions.${index}.type`);
  const questionTitle = watch(`questions.${index}.title`);
  const questionId = watch(`questions.${index}.id`);

  // // Debounce API call to reduce excessive requests
  const debouncedUpsert = useDebouncedCallback(
    async (formId, questionId, data) => {
      setIsUpdating(true); // Start loading
      try {
        await FormService.upsertQuestion(formId, questionId, data);

        setSuccess(true);
        setTimeout(() => setSuccess(false), 1000);
      } catch (error) {
        toaster.create({
          title: "Failed to update question",
          type: "error",
          id: "update-question-error",
        });
        console.error("Failed to update question:", error);
      } finally {
        setIsUpdating(false); // Stop loading
      }
    },
    500
  );

  // Subscribe to field changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.startsWith(`questions.${index}`)) {
        const questionData = value.questions?.[index];

        trigger(`questions.${index}`).then((isValid) => {
          // only save if question is valid
          if (questionData?.id && isValid) {
            debouncedUpsert(formId, questionData.id, questionData);
          }
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, formId, index, debouncedUpsert, trigger]);

  const onRemoveQuestion = async () => {
    try {
      setIsDeleting(true);
      await FormService.deleteQuestion(formId, questionId);
      onRemove();
    } catch (error) {
      toaster.create({
        title: "Failed to delete question",
        type: "error",
        id: "delete-question-error",
      });
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Box>
      <Collapsible.Root open={isOpen} onOpenChange={onToggle}>
        <Card.Root size={"sm"}>
          <Card.Body cursor={isOpen ? "default" : "pointer"}>
            <Collapsible.Trigger asChild>
              <HStack m={1}>
                <Box flex="1" onClick={(e) => isOpen && e.stopPropagation()}>
                  {isOpen ? (
                    <Controller
                      control={control}
                      name={`questions.${index}.title`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextInput
                          label="Question Title"
                          placeholder="Enter question title"
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          required={true}
                        />
                      )}
                    />
                  ) : (
                    <Text>{questionTitle}</Text>
                  )}
                </Box>
                <HStack mt={isOpen ? "26px" : 0} transition={"all .2s"}>
                  <Spinner
                    visibility={isUpdating ? "visible" : "hidden"}
                    size="sm"
                    color={"green"}
                  />
                  {success && (
                    <Icon color="green" pos={"absolute"}>
                      <FaCheck />
                    </Icon>
                  )}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveQuestion();
                    }}
                    variant={"ghost"}
                    colorPalette={"red"}
                    loading={isDeleting}
                    disabled={isDeleting}
                  >
                    <LuTrash />
                  </IconButton>
                  <IconButton
                    cursor={"pointer"}
                    variant={"plain"}
                    rotate={isOpen ? "180deg" : "0deg"}
                    transition={"all .2s"}
                  >
                    <LuChevronDown />
                  </IconButton>
                </HStack>
              </HStack>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Stack mt={4} gap={4} m={1}>
                <HStack alignItems={"center"} gap={5}>
                  <Controller
                    control={control}
                    name={`questions.${index}.type`}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectInput
                        label="Question Type"
                        placeholder="Select type"
                        options={questionOptions}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        required={true}
                      />
                    )}
                  />

                  <HStack mt="26px" gap={6}>
                    <Controller
                      control={control}
                      name={`questions.${index}.isRequired`}
                      render={({ field }) => (
                        <Checkbox
                          name={field.name}
                          checked={field.value}
                          onChange={field.onChange}
                        >
                          Required
                        </Checkbox>
                      )}
                    />
                  </HStack>
                </HStack>

                <Controller
                  control={control}
                  name={`questions.${index}.helperText`}
                  render={({ field }) => (
                    <TextInput
                      label="Helper Text"
                      placeholder="Enter helper text"
                      helperText="Additional Instructions (optional)"
                      name={field.name}
                      checked={Boolean(field.value)}
                      onChange={field.onChange}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`questions.${index}.defaultValue`}
                  render={({ field }) => (
                    <TextInput
                      label="Initial Value"
                      placeholder="Enter initial value"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                {questionType === QuestionType.TEXT && (
                  <Controller
                    control={control}
                    name={`questions.${index}.isParagraph`}
                    render={({ field }) => (
                      <Checkbox
                        name={field.name}
                        checked={field.value}
                        onChange={field.onChange}
                      >
                        Is Paragraph?
                      </Checkbox>
                    )}
                  />
                )}
                {questionType === QuestionType.NUMBER && (
                  <HStack gap={4}>
                    <Controller
                      control={control}
                      name={`questions.${index}.numberType`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <SelectInput
                          label="Number Type"
                          placeholder="Select type"
                          options={numberOptions}
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          required={true}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`questions.${index}.min`}
                      render={({ field }) => (
                        <NumberInput
                          label="Min"
                          placeholder="Enter min"
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`questions.${index}.max`}
                      render={({ field }) => (
                        <NumberInput
                          label="Max"
                          placeholder="Enter max"
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </HStack>
                )}
                {questionType === QuestionType.SELECT && (
                  <QuestionOptions questinIndex={index} />
                )}
              </Stack>
            </Collapsible.Content>
          </Card.Body>
        </Card.Root>
      </Collapsible.Root>
    </Box>
  );
}
