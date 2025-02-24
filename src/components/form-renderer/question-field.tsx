import { NumberInput, SelectInput, TextInput } from "@/components/ui";
import { TextAreaInput } from "@/components/ui/text-area-input";
import { QuestionType } from "@/constants";
import { QuestionSchema } from "@/lib/types";
import { getFormatOptions } from "@/utils";
import { Card } from "@chakra-ui/react";

interface QuestionFieldProps {
  question: QuestionSchema;
  value?: string;
  onChange: (value: string) => void;
  errorText?: string;
}

export const QuestionField = ({
  question,
  value,
  onChange,
  errorText,
}: QuestionFieldProps) => {
  const renderField = () => {
    const commonProps = {
      label: question.title,
      name: question.id,
      placeholder: "Your answer",
      helperText: question.helperText,
      required: question.isRequired,
      value,
      onChange,
      errorText,
    };

    switch (question.type) {
      case QuestionType.TEXT:
        if (question.isParagraph) {
          return <TextAreaInput {...commonProps} />;
        }

        return <TextInput {...commonProps} />;

      case QuestionType.NUMBER:
        return (
          <NumberInput
            {...commonProps}
            formatOptions={{
              ...getFormatOptions(question.numberType),
            }}
          />
        );

      case QuestionType.SELECT:
        return (
          <SelectInput
            {...commonProps}
            options={
              question.options?.map((option) => ({
                label: option,
                value: option,
              })) || []
            }
          />
        );

      default:
        return <TextInput {...commonProps} />;
    }
  };

  return (
    <Card.Root size="md" w="full">
      <Card.Body color="fg.muted">{renderField()}</Card.Body>
    </Card.Root>
  );
};
