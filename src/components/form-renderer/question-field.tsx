import { NumberInput, SelectInput, TextInput } from "@/components/ui";
import { QuestionType } from "@/constants";
import { Card } from "@chakra-ui/react";

export const QuestionField = ({ question }) => {
  const renderField = () => {
    switch (question.type) {
      case QuestionType.TEXT:
        return <TextInput label={question.title} name={question.id} placeholder="Your answer" />;
      case QuestionType.NUMBER:
        return <NumberInput label={question.title} name={question.id} placeholder="Your answer" />;
      case QuestionType.SELECT:
        return (
          <SelectInput options={question.options} label={question.title} name={question.id} placeholder="Your answer" />
        );
      default:
        return <TextInput label={question.title} name={question.id} placeholder="Your answer" />;
    }
  };

  return (
    <Card.Root size="md" w="full">
      <Card.Body color="fg.muted">{renderField()}</Card.Body>
    </Card.Root>
  );
};
