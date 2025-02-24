import { TextInput } from "@/components/ui";
import { Button, VStack } from "@chakra-ui/react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export const QuestionOptions = ({ questinIndex }: { questinIndex: number }) => {
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control: control,
    name: `questions.${questinIndex}.options`,
  });

  const onAddOptions = () => {
    append("");
  };

  return (
    <VStack gap={4}>
      {fields.map((optionField, optionIndex) => (
        <Controller
          control={control}
          key={optionField.id}
          name={`questions.${questinIndex}.options.${optionIndex}`}
          render={({ field }) => (
            <TextInput
              key={optionIndex}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              placeholder={"Enter option"}
            />
          )}
        />
      ))}

      <Button alignSelf="flex-end" onClick={onAddOptions}>
        Add Option
      </Button>
    </VStack>
  );
};
