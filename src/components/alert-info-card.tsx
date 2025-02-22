import { EmptyState, VStack } from "@chakra-ui/react";
import { LuCircleAlert } from "react-icons/lu";

export const AlertInfoCard = ({ title = "", description = "" }) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuCircleAlert />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
