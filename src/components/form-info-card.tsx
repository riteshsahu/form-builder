import { QuestionSchema } from "@/lib/types";
import { Card } from "@chakra-ui/react";

interface FormInfoCardProps {
  title: string;
  questions: QuestionSchema[];
  renderActions?: () => React.ReactNode;
}

export const FormInfoCard = ({ renderActions, ...rest }: FormInfoCardProps) => {
  const { title, questions = [] } = rest;
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>Questions: {questions.length}</Card.Description>
      </Card.Body>
      <Card.Footer gap="2" justifyContent="flex-end">
        {renderActions && renderActions()}
      </Card.Footer>
    </Card.Root>
  );
};
