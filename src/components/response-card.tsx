import { FormResponseSchema } from "@/lib/types";
import { Card, List, Span, Text } from "@chakra-ui/react";

export const ResponseCard = (props: FormResponseSchema) => {
  const { title, answers } = props;
  return (
    <Card.Root w="full" p={5}>
      <Card.Body>
        <Card.Title textAlign="center">{title}</Card.Title>
        <List.Root as="ol" gap={5} mt={5}>
          {answers?.map((answer) => (
            <List.Item key={answer.title}>
              <Text fontWeight={"bold"}>{answer.title}</Text>
              <Text>
                <Span fontWeight="bold" color={"gray.500"}>
                  Answer:{" "}
                </Span>
                <Span>{answer.value}</Span>
              </Text>
            </List.Item>
          ))}
        </List.Root>
      </Card.Body>
    </Card.Root>
  );
};
