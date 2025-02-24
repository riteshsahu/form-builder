import { AbsoluteCenter, Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <AbsoluteCenter justifyContent="center" alignItems="center" gap={10}>
      <Spinner size="xl" />
    </AbsoluteCenter>
  );
};
